import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/users';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  users!: Users[];

  constructor(
    private usersService: TableService,
  ) { }

  ngOnInit() {
    this.usersService
      .findAll()
      .subscribe((users: Users[]) => {
        this.users = users;
      });
  }

}
