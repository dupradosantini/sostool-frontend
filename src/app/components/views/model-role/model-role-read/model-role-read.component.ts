import { Component, OnInit } from '@angular/core';
import { ModelRole } from '../model-role.model';
import { ModelRoleService } from '../model-role.service';

@Component({
  selector: 'app-model-role-read',
  templateUrl: './model-role-read.component.html',
  styleUrls: ['./model-role-read.component.sass']
})
export class ModelRoleReadComponent implements OnInit {

  modelRoleArray: ModelRole[] = [];

  constructor(private service: ModelRoleService) { }

  ngOnInit(): void {
    this.getModelRoles();
  }

  getModelRoles(): void {
    this.service.findAllModelRoles()
    .subscribe({
      next: (response) => {
        this.modelRoleArray = response;
        console.log(this.modelRoleArray);
      },
      error: (errorResp) => {
        console.log(errorResp);
      }
    })
  }

}
