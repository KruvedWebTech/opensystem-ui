import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'access-denied', component: AccessDeniedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
