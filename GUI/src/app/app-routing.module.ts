import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListsComponent} from "./shared/components/todo-lists/todo-lists.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo-lists',
    pathMatch: 'full'
  }, {
    path: 'todo-lists',
    component: TodoListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
