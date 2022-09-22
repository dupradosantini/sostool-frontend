import { Component, OnInit, Input } from '@angular/core';
import { Responsibility } from '../../model-responsibility/model-responsibility.model';
import { Roles } from '../workspace.model';
import { TeamViewService } from './team-view.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.sass']
})
export class TeamViewComponent implements OnInit {

  selectedRole?: Roles;
  addResponsibilityFlag: Boolean = false;

  @Input() teamAssignedRoles: Roles[] = [];
  @Input() workspaceResponsibilities: Responsibility[] = [];
  @Input() workspaceId: Number = 0;

  constructor(private service: TeamViewService) { }

  ngOnInit(): void {
    this.teamAssignedRoles.sort(this.compare);
    console.log(this.workspaceResponsibilities);
  }


  compare( a: any , b: any ){
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  seeRole(modal: Element, roleId: Number) {
    this.toggleModal(modal);
    for(let role of this.teamAssignedRoles){
      if(roleId === role.id){
        this.selectedRole = role;
      }
    }

  }

  toggleModal(modal: Element) {
    modal.classList.toggle('is-active');
    this.addResponsibilityFlag=false;
  }

  addResponsibility(){
    this.addResponsibilityFlag=true;
  }

  assignResponsibilityToRole(selectionValue: string, modal: Element){
        //Gets the Id of the selected role
        for(let responsibility of this.workspaceResponsibilities){
          if(responsibility.description === selectionValue){
            const respId = responsibility.id;
            const roleId = this.selectedRole?.id;
            if(roleId !== undefined){
            this.service.assignResponsibilityToRole(this.workspaceId, roleId, respId)
            .subscribe({
              next: (response) => {
                console.log(response);
                this.selectedRole?.roleAssignedResponsibilities?.push(responsibility);
                this.toggleModal(modal);
              },
              error: (errorResponse) => {
                console.log(errorResponse);
                alert("Role assignment failed!");
              }
            })
            }
          }
        }

  }


}
