import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RulesComponent } from './rules/rules.component';
import { RegisterComponent } from './register/register.component';
import { ThanksComponent } from './thanks/thanks.component';
import { ScanerComponent } from './scaner/scaner/scaner.component';
import { InfoComponent } from './scaner/info/info.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BeforeScanComponent } from './before-scan/before-scan.component';
import { StatsComponent } from './stats/stats.component';
const firebaseConfig = {
  apiKey: 'AIzaSyDm-oYojudX1K32-1FRXrOXmmy4vZFWmXU',
  authDomain: 'galaxy-note-10.firebaseapp.com',
  databaseURL: 'https://galaxy-note-10.firebaseio.com',
  projectId: 'galaxy-note-10',
  messagingSenderId: '552592102667',
  appId: '1:552592102667:web:98e9b46dd0573c03'
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RulesComponent,
    RegisterComponent,
    ThanksComponent,
    ScanerComponent,
    InfoComponent,
    BeforeScanComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
