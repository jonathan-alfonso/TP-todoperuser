import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todos } from 'src/app/shared/models/todos';
import { Users } from 'src/app/shared/models/users';
import { TodosService } from 'src/app/shared/services/todos.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  userId!: string;
  user!: Users;
  todosDone!: Todos[];
  todosNotDone!: Todos[];

  constructor(
    private todosService: TodosService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { 
    let tmpUserId = activatedRoute.snapshot.paramMap.get("userId");
    if(tmpUserId) {
      this.userId = tmpUserId;
      usersService
        .getById(this.userId)
        .subscribe(user => {
          this.user = user;
        });
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

  taskToggle(todo: Todos) {
    todo.done = !todo.done;
    this.todosService
      .updateTodosService(todo)
      .subscribe(() => {
        this.refresh();
      });
  }

  refresh() {
    this.todosService
      .getTodosByUser(this.userId)
      .subscribe((todos: Todos[]) => {
        this.todosDone = todos.filter(t => t.done==true);
        this.todosNotDone = todos.filter(t => t.done==false);
      });
  }

  deleteTodo(todo: Todos) {
    this.todosService
      .deleteTodosService(todo.id)
      .subscribe(() => {
        this.refresh();
      });
  }

  filterTodos(e: any) {
    console.log(e.currentTarget.value);
    let val = e.currentTarget.value;

    if(val) {
      this.todosService
        .getTodosByCategory(val)
        .subscribe((todos: Todos[]) => {
          this.todosDone = todos.filter(t => t.done==true);
          this.todosNotDone = todos.filter(t => t.done==false);
        });
    } else {
      this.refresh();
    }


  }

}
