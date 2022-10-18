import { Component, OnInit, Input } from '@angular/core';
import { ModelResponsibility, Responsibility } from '../../model-responsibility/model-responsibility.model';
import { Roles } from '../workspace.model';
import { WorkspaceService } from '../workspace.service';
import { TeamViewService } from './team-view.service';
import { WorkspaceSingleComponent } from '../workspace-single/workspace-single.component';
import { User } from '../../users-read/userModel';
import { UserReadService } from '../../users-read/user-read.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.sass']
})
export class TeamViewComponent implements OnInit {

  selectedRole = {} as Roles;
  addResponsibilityFlag: Boolean = false;
  isNewResponsibilityCreation: boolean = true;
  isAddUser: boolean = false;
  userArray: User[]=[];
  lastSelectedUser = {} as User;
  roleAssignedMembers: User[] = [];
  hasUserSelected: boolean = false;
  hasRespSelected: boolean = false;

  @Input() teamAssignedRoles: Roles[] = [];
  @Input() workspaceResponsibilities: Responsibility[] = [];
  @Input() workspaceId: Number = 0;
  @Input() modelResponsibilities: ModelResponsibility[] = [];
  @Input() teamId: Number = -1;

  lastSelectedModelResponsibility: ModelResponsibility = {
    id:1,
    description:""
  }

  constructor(private service: TeamViewService,
    private respService: WorkspaceService,
    private workspaceComponenet: WorkspaceSingleComponent,
    private userService: UserReadService) { }

  ngOnInit(): void {
    this.teamAssignedRoles.sort(this.compare);
    console.log(this.workspaceResponsibilities);
    this.getUsers();
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
    this.getRoles();
    this.toggleModal(modal);
    for(let role of this.teamAssignedRoles){
      if(roleId === role.id){
        this.selectedRole = role;
      }
    }
    this.findRoleMembers();
  }

  toggleModal(modal: Element) {
    modal.classList.toggle('is-active');
    this.addResponsibilityFlag=false;

    this.respService.findWorkspaceResponsibilities(this.workspaceId)
        .subscribe({
          next: (response) => {
            this.workspaceResponsibilities = response
          }
    })
    this.getRoles();
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
                alert("Responsibility Assignment succeded");
              },
              error: (errorResponse) => {
                console.log(errorResponse);
                alert("Responsibility assignment failed!");
              }
            })
            }
          }
        }

  }

  responsibilityCreationTypeSelection(elementOn: HTMLElement, elementOff: HTMLElement, newResponsibility: boolean, finishButton: HTMLButtonElement){

    this.hasRespSelected = true;
    finishButton.disabled = false;

    if(!elementOn.classList.contains('is-active') && !elementOff.classList.contains('is-active')){
      elementOn.classList.toggle('is-active');
    }

    this.isNewResponsibilityCreation = newResponsibility;
    if(!elementOn.classList.contains('is-active')){
      elementOn.classList.toggle('is-active');
      elementOff.classList.toggle('is-active');
    }
  }

  cancelToggle(modal: Element, finishButton: HTMLButtonElement, elementOn:HTMLElement, elementOff:HTMLElement){

    this.isAddUser = false;

    this.disableButton(finishButton);

    this.removeResponsibilityToggle(elementOn, elementOff);

    this.toggleModal(modal);

    const emptyUser = {} as User
    this.lastSelectedUser = emptyUser;
    this.hasUserSelected = false;
    this.hasRespSelected = false;
  }

  finishEdit(selectionValue: string, modal: HTMLElement, responsibilityDescription: string){
    if(this.hasRespSelected && !this.isNewResponsibilityCreation ){
      this.assignResponsibilityToRole(selectionValue, modal);
    }else if(this.hasRespSelected){
      this.createResponsibilityInWorkspace(responsibilityDescription, modal)
    }
    if(this.hasUserSelected){
      //calls the function to save the user assignment
      this.completeUserAssignmentToRole()
    }
  }

  createResponsibilityInWorkspace(responsibilityDescription: string, modal: HTMLElement): void{

    const placeholderResponsibility : Responsibility = {
      id: 0,
      description: responsibilityDescription,
      parentResponsibility: this.lastSelectedModelResponsibility
    }

    this.respService.createResponsibilityInWorkspace(this.workspaceId, placeholderResponsibility)
    .subscribe({
      next: (response) => {
        console.log("A resposta recebida (sucesso) foi:");
        console.log(response);
        this.respService.findWorkspaceResponsibilities(this.workspaceId)
        .subscribe({
          next: (response) => {
            this.workspaceResponsibilities = response
            this.assignResponsibilityToRole(placeholderResponsibility.description, modal)
          }
        })
      },
      error: (response) => {
        console.log(response);
        this.toggleModal(modal);
      }
    })

  }

  copyModelResponsibility(selectedModel: string, responsibilityDescField: HTMLInputElement){

    for(let r of this.modelResponsibilities){
      if(r.description == selectedModel){
        responsibilityDescField.value = r.description.toString();
        this.lastSelectedModelResponsibility.id = r.id;
        this.lastSelectedModelResponsibility.description = r.description;
      }
    }
  }

  removeRespFromRole(responsibility: Responsibility){
    const roleId = this.selectedRole?.id;
    if(roleId !== undefined){
      this.service.removeResponsibilityFromRole(this.workspaceId,roleId,responsibility.id)
    .subscribe({
      next: (response) => {
        if(this.selectedRole != undefined){
          this.selectedRole.roleAssignedResponsibilities = response;
        }
        console.log(response);
        alert("responsibility removed");
      }
    })
    }
  }

  removeMemberFromRole(member: User){
    console.log(member);
    console.log(this.selectedRole);
    const roleId = this.selectedRole.id;
    this.service.removeMemberFromRole(this.workspaceId,roleId, member)
    .subscribe({
      next: (response) => {
        console.log(response);
        //update the view to show that the user was removed.
        this.findRoleMembers();
      },
      error: (errorResp) => {
        console.log(errorResp);
        alert("User removal from role failed!");
      }
    })
  }

  getUsers(){
    this.userService.findAllUsers()
    .subscribe({
      next: (response) => {
        this.userArray = response;
      }
    })
  }

  addMemberToggle(button: HTMLButtonElement, respCreationElement:HTMLElement, respSelectElement:HTMLElement){
    this.isAddUser = !this.isAddUser;
    this.disableButton(button);
    this.removeResponsibilityToggle(respCreationElement,respSelectElement);
  }

  removeResponsibilityToggle(elementOn:HTMLElement, elementOff:HTMLElement){

    if(elementOn.classList.contains('is-active')){
      elementOn.classList.toggle('is-active');
    }

    if(elementOff.classList.contains('is-active')){
      elementOff.classList.toggle('is-active');
    }
  }

  disableButton(button: HTMLButtonElement){
    button.disabled = true;
  }

  copyUserValue(selectionValue: string, button: HTMLButtonElement){
    button.disabled = false;
    console.log(selectionValue);
    for (let u of this.userArray){
      if(u.name === selectionValue){
        this.lastSelectedUser.id = u.id;
        this.lastSelectedUser.email = u.email;
        this.lastSelectedUser.name = u.name;
        this.lastSelectedUser.workspaceMember = u.workspaceMember
      }
    }
    console.log(this.lastSelectedUser);
    this.hasUserSelected = true;
  }

  //TODO - Responsibility Select Confirm button to toggle the save button.
  //TODO -
  /*In the back end- check if the user selected is already a member
    of the workspace (with ongoing role -> dateEnd = null)
    create the workspace member relationship and add to role.
    */

    completeUserAssignmentToRole(){
      this.service.assignUserToRole(this.workspaceId,this.selectedRole.id,this.lastSelectedUser.id)
      .subscribe({
        next: (response) => {
          this.roleAssignedMembers = response;
          console.log(this.roleAssignedMembers)
        },
        error: (errorResp) => {
          alert(errorResp.error.message);
        }
      })
    }

    //Fetches an array of Users that are already assigned to the selected role;
    findRoleMembers(){
      this.service.getRoleAssignedUsers(this.workspaceId, this.selectedRole.id)
      .subscribe({
        next: (response) => {
          this.roleAssignedMembers = response;
        },
        error: (errorResp) => {
          console.log(errorResp);
        }
      })
    }

    getRoles(){
      this.service.findWorkspaceRolesInTeam(this.workspaceId,this.teamId).subscribe({
        next: (response) => {
          this.teamAssignedRoles = response;
        }
      });
    }

}
