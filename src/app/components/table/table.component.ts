import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/users';
import { UsersService } from 'src/app/shared/services/users.service';
import { faEraser, faUserSlash, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  users!: Users[];

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  faUpdate = faEraser;
  faDelete = faUserSlash;
  faTodos = faUsersViewfinder;

  getUsers() {
    this.usersService
      .getUsersService()
      .subscribe((users: Users[]) => {
        this.users = users;
      });
  }

  deleteUser(id: string) {
    this.usersService
      .deleteUserService(id)
      .subscribe((user) => {
        this.getUsers();
      })
  }
}
