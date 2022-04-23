import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { TodosFormComponent } from './components/todos-form/todos-form.component';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'todos/:userId',
    component: TodosComponent,
  },
  {
    path: 'todos-form/:userId/:id',
    component: TodosFormComponent,
  },
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'table',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
