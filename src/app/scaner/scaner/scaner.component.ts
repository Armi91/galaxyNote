import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import jsQR from 'jsqr';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.scss']
})
export class ScanerComponent implements OnInit, AfterViewInit, OnDestroy {
  

  @ViewChild('canvasElement', {static: true}) canvasElement: ElementRef;
  video;
  canvas;
  displayError = false;
  scanned = false;
  pointsLeft = 4;
  animation;
  isScanningPrize = false;
  scannedPrize = false;
  searchedCode = '';

  constructor(private router: Router, private db: DbService, private auth: AuthService, private activatedRoute: ActivatedRoute) {
    this.video = document.createElement('video');
    this.auth.user$.subscribe(user => {
    const entries = Object.entries(user.scanned);
    this.pointsLeft = entries.filter((val) => {
        if (val[0] !== 'prize') {
          return val[1] === false;
        }
      }).length;
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params && params.type && params.type === 'prize') {
        this.isScanningPrize = true;
      }
      if (params && params.type) {
        this.searchedCode = params.type;
      }
    });
  }

  ngOnInit() {
    this.db.countPointsLeft().then(data => {
    });
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasElement.nativeElement.getContext('2d');
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      }
    }).catch((err) => {
      if (err) {
        this.displayError = true;
      }
    }).then((stream) => {
      this.video.srcObject = stream;
      this.video.setAttribute('playsinline', 'true');
      this.video.play();
      this.animation = requestAnimationFrame(this.tick);
    });
  }

  drawLine(begin, end, color) {
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }

  tick = (t) => {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvasElement.nativeElement.height = this.video.videoHeight;
      this.canvasElement.nativeElement.width = this.video.videoWidth;
      this.canvas.drawImage(this.video, 0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
      const imageData = this.canvas.getImageData(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      if (code) {
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
        if (!this.isScanningPrize) {
          if (code.data === this.searchedCode) {
            this.scanned = true;
            this.video.srcObject.getTracks()[0].stop();
            this.onScanned(code);
          }
        } else {
          this.onScannedPrize(code);
        }
      }
    }
    if (!this.scanned) {
      this.animation = requestAnimationFrame(this.tick);
    } else {
      window.cancelAnimationFrame(this.animation);
    }
  }

  onScanned(code) {
    this.auth.userSnapshot$.subscribe(res => {
      this.db.updateScanned(res.payload.id, code.data).then(() => {
        if (this.pointsLeft === 0) {
          this.router.navigate(['/main']);
        }
      });
    });
  }

  onScannedPrize(code) {
    if (code.data === 'prize') {
      this.scannedPrize = true;
      this.video.srcObject.getTracks()[0].stop();
      this.auth.userSnapshot$.subscribe(res => {
        this.db.updateScanned(res.payload.id, code.data).then(() => {
          this.router.navigate(['/thanks']);
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.video.srcObject.getTracks()[0].stop();
    window.cancelAnimationFrame(this.animation);
  }
}
