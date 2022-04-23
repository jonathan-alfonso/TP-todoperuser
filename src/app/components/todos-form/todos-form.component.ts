import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Todos } from 'src/app/shared/models/todos';
import { TodosService } from 'src/app/shared/services/todos.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-todos-form',
  templateUrl: './todos-form.component.html',
  styleUrls: ['./todos-form.component.css']
})
export class TodosFormComponent implements OnInit {
  todo: Todos = new Todos('', '', '', false, '');

  constructor(
    private todosService: TodosService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { 
    let userId = activatedRoute.snapshot.paramMap.get("userId");
    if(userId) {
      this.todo.userId = userId;
    }
    let todoId = activatedRoute.snapshot.paramMap.get("id");
    if(todoId && todoId != "0") {
      this.todosService
        .getTodoServices(todoId)
        .subscribe(todo => {
          this.todo = todo;
        });
    } else if(userId) {
      this.todo.userId = userId;
    }
  }

  ngOnInit(): void {
  }

  submitForm() {
    if(this.todo.id) {
      this.todosService
        .updateTodosService(this.todo)
        .subscribe(todo => {
          this.route.navigateByUrl("/todos/" + todo.userId);
        });
    } else {
      this.todosService
        .addTodosService(this.todo)
        .subscribe(todo => {
          this.route.navigateByUrl("/todos/" + todo.userId);
        });
    }
  }

}
