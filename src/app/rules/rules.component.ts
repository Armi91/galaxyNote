import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private db: DbService) { }

  ngOnInit() {
  }

  startGame() {
    if (this.auth.isLogged) {
      this.router.navigate(['/main']);
    } else {
      this.auth.register().then((res) => {
        // this.router.navigate(['/main']);
        this.db.saveUser({
          name: '',
          lastname: '',
          email: '',
          agreement: true,
          scanned: {
            camera: false,
            design: false,
            efficiency: false,
            spen: false
          }
        }, res.user.uid).then(() => {
          this.router.navigate(['/main']);
        });
      })
    }
  }

}
