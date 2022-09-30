import { Component, OnInit } from '@angular/core';
import { UserReadService } from './user-read.service';
import { User } from './userModel';

@Component({
  selector: 'app-users-read',
  templateUrl: './users-read.component.html',
  styleUrls: ['./users-read.component.sass']
})
export class UsersReadComponent implements OnInit {

  userArray:User[] = [];

  constructor(private service: UserReadService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.service.findAllUsers()
    .subscribe({
      next: (response) => {
        this.userArray = response;
        console.log(response);
      }
    })
  }

}
