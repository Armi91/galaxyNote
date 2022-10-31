import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-before-scan',
  templateUrl: './before-scan.component.html',
  styleUrls: ['./before-scan.component.scss']
})
export class BeforeScanComponent implements OnInit, OnDestroy, AfterViewInit {

  pointsScanned = 0;
  scan = {
    design: false,
    camera: false,
    efficiency: false,
    spen: false,
    prize: false
  };

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.scan = user.scanned;
        let count = 0;
        for (const i in user.scanned) {
          if (user.scanned.hasOwnProperty(i)) {
            if (user.scanned[i]) {
              if (i !== 'prize') {
                count++;
              }
            }
          }
        }
        this.pointsScanned = count;
      }
    });
  }

  ngAfterViewInit(): void {
    this.calculateHeight();
    window.addEventListener('resize', this.calculateHeight, false);
  }

  calculateHeight() {
    const items = document.querySelectorAll('.icon-item');
    if (items) {

    }
    const firstItem = items[0].getBoundingClientRect().left + items[0].getBoundingClientRect().width;
    const secItem = items[1].getBoundingClientRect().left;
    const gap = secItem - firstItem;

    items.forEach((el: HTMLElement) => {
      const w = el.offsetWidth;
      el.style.height = w + 'px';
      el.style.marginBottom = gap + 'px';
    });

    const images = document.querySelectorAll('.icon-img');
    images.forEach((el: HTMLElement) => {
      const parentW = el.parentElement.offsetHeight;
      el.style.height = (parentW * 0.3) + 'px';
      el.style.width = (parentW * 0.3) + 'px';
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.calculateHeight, false);
  }

}
