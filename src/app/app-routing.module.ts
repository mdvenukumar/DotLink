import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ValidateComponent } from './validate/validate.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'validate', component: ValidateComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: '', redirectTo: '/user-form', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
