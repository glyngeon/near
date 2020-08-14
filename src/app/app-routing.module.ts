import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './post-login/users/users.component';
import { SigninComponent } from './signin/signin.component';
import { NewUserComponent } from './post-login/new-user/new-user.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: SigninComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'newUser', component: NewUserComponent, canActivate: [AuthGuard] },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
