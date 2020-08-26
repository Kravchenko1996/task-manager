import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListsComponent} from './shared/components/todo-lists/todo-lists.component';
import {AuthComponent} from './pages/auth/auth.component';
import {LoginComponent} from './pages/login/login.component';
import {MainComponent} from './pages/main/main.component';
import {RegisterComponent} from './pages/register/register.component';
import {AuthGuard} from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TodoListsComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
