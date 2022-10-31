import { Component, OnInit } from '@angular/core';
import { RegisterData } from '../interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLogin = false;
  form: RegisterData = {
    name: '',
    lastname: '',
    email: '',
    agreement: false,
    scanned: {
      camera: false,
      design: false,
      efficiency: false,
      spen: false
    }
  };
  loginEmail;

  errors = {
    invalidEmail: false,
    missingData: false
  }

  constructor(private router: Router, private auth: AuthService, private db: DbService) {
    if (this.auth.isLogged) {
      this.router.navigate(['/main']);
    }
  }

  ngOnInit() {
  }

  validateForm() {
    if (this.form.name && this.form.lastname && this.form.email && this.form.agreement) {
      this.errors.missingData = false;
      return true;
    } else {
      this.errors.missingData = true;
      return false;
    }
  }

  changeToLogin(e, toWhat?) {
    e.preventDefault();
    if (!toWhat) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  login() {
    this.auth.login(this.loginEmail).then((res: any) => {
      this.router.navigate(['/main']);
    }).catch((err) => {
      if (err.code && (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found')) {
        this.errors.invalidEmail = true;
      }
    });
  }

  onCheckClick() {
    this.form.agreement = !this.form.agreement;
  }

  onRegister() {
    if (this.validateForm()) {
      this.auth.register(this.form.email).then((res) => {
        if (res && res.code) {
          if (res.code == 'auth/email-already-in-use') {
            alert('Użytkownik o podanym adresie email już istnieje');
          } else if (res.code == 'auth/invalid-email') {
            alert('Niepoprawny adres email');
          }
        } else {
          this.db.saveUser(this.form, res.user.uid).then(() => {
            this.router.navigate(['/main']);
          });
        }
      });
    }
  }

}
