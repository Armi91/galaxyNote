import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RulesComponent } from './rules/rules.component';
import { RegisterComponent } from './register/register.component';
import { ScanerComponent } from './scaner/scaner/scaner.component';
import { InfoComponent } from './scaner/info/info.component';
import { BeforeScanComponent } from './before-scan/before-scan.component';
import { ThanksComponent } from './thanks/thanks.component';
import { ServicesGuard } from './services/services.guard';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'main',
    component: BeforeScanComponent,
    // canActivate: [ServicesGuard]
  },
  {
    path: 'info',
    component: InfoComponent,
    // canActivate: [ServicesGuard]
  },
  {
    path: 'info/:id',
    component: InfoComponent,
    // canActivate: [ServicesGuard]
  },
  {
    path: 'scanner',
    component: ScanerComponent,
    // canActivate: [ServicesGuard]
  },
  {
    path: 'scanner/:type',
    component: ScanerComponent,
    // canActivate: [ServicesGuard]
  },
  {
    path: 'thanks',
    component: ThanksComponent,
    // canActivate: [ServicesGuard]
  },
  // {
  //   path: 'stats',
  //   component: StatsComponent
  // },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
