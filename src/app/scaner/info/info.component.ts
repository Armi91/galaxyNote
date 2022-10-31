import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  data: any;
  currentParam = '';
  scan = {
    design: false,
    camera: false,
    efficiency: false,
    spen: false,
    prize: false
  };

  constructor(private activatedRoute: ActivatedRoute, private db: DbService, private auth: AuthService) {
    this.activatedRoute.params.subscribe(params => {
      if (params && (params.id === 'camera' || params.id === 'efficiency' || params.id === 'spen' || params.id === 'design')) {
        this.currentParam = params.id;
        this.db.getContent(params.id).subscribe(data => {
          this.data = data;
        });
      }
    });
    this.auth.user$.subscribe((user) => {
      this.scan = user.scanned;
    });
  }

  ngOnInit() {
  }

}
