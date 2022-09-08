import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelRole } from '../../model-role/model-role.model';
import { Roles, Teams } from '../workspace.model';
import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-workspace-single',
  templateUrl: './workspace-single.component.html',
  styleUrls: ['./workspace-single.component.sass']
})
export class WorkspaceSingleComponent implements OnInit {

  firstLoad: boolean = true;
  workspaceId: Number;
  teamsArray: Teams[];
  selectedTeam: number;
  workspaceName: String;
  modelRoles: Roles[] = [];
  //This is the default "Other" model role in the back-end.
  lastSelectedModel: ModelRole = {
    id: 1,
    name: "",
    description:""
  }
  workspaceRoles: Roles[] = [];

  constructor(
    private service: WorkspaceService,
    private route: ActivatedRoute) {
      this.workspaceId = 0
      this.teamsArray = [];
      this.selectedTeam = 0;
      this.workspaceName = "";
     }

  ngOnInit(): void {
    //Extrair o id da url
    this.route.params.subscribe(params => this.workspaceId = params['id']);
    this.getTeams();
    this.getModelRoles();
  }

  getTeams(): void {
    this.service.findWorkspaceById(this.workspaceId)
    .subscribe({
      next: (response) => {
        this.teamsArray = response.teams;
        this.workspaceName = response.name;
      }
    })
  }

  getModelRoles(): void {
    this.service.findModelRoles()
    .subscribe({
      next: (response) => {
        this.modelRoles = response;
      }
    })
  }

  getWorkspaceRoles(){
    this.service.findWorkspaceRoles(this.workspaceId)
    .subscribe({
      next:(response) => {
        this.workspaceRoles = response;
      }
    })
  }

  selectTeam(index: number, tabs: Element): void {
    this.firstLoad = false;
    this.selectedTeam = index;
    const children = tabs.children;
    this.getWorkspaceRoles();
    for (let i = 0; i < children.length; i++) {
      let tableChild = children[i];
      // Do stuff
      if(i == index){
        tableChild.setAttribute("class","is-active");
      }else{
        tableChild.setAttribute("class","");
      }
    }
  }

  toggleModal(modal: any) {
    modal.classList.toggle('is-active');
  }

  createRoleInWorkspace(roleName: string, roleDesc: string, modal: HTMLElement): void {

    const placeholderRole: Roles = {
      id: 0,
      name: roleName,
      description: roleDesc,
      parentRole: this.lastSelectedModel
    }
    console.log(placeholderRole);

    this.service.createRoleInWorkspace(this.workspaceId, placeholderRole)
    .subscribe({
      next: (response) => {
        console.log("A resposta recebida (sucesso) foi:" + response);
        this.toggleModal(modal);
        alert("Role Criada com Sucesso");
        this.getWorkspaceRoles();
      },
      error: (response) => {
        console.log(response);
        this.toggleModal(modal);
      }
    })
  }

  copyModelRole(selectedModel: string, roleNameField: any, roleDescField: any){
    console.log(selectedModel);
    roleNameField.value = "Nome de teste";
    for(let r of this.modelRoles){
      if(r.name == selectedModel){
        roleNameField.value = r.name;
        roleDescField.value = r.description;

        this.lastSelectedModel.id = r.id;
        this.lastSelectedModel.name = r.name;
        this.lastSelectedModel.description = r.description;
      }
    }
  }

  assignRoleToTeam(selectedRole: string, modal: Element, tabs: Element){
    //Gets the Id of the selected role
    for(let role of this.workspaceRoles){
      if(role.name === selectedRole){
        const roleId = role.id;
        const teamId = this.teamsArray[this.selectedTeam].id;
        this.service.assignRoleToTeam(this.workspaceId, teamId, roleId)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.teamsArray[this.selectedTeam].teamAssignedRoles.push(role);
            this.toggleModal(modal);
          },
          error: (errorResponse) => {
            console.log(errorResponse);
            alert(errorResponse.error.message);
          }
        })
      }
    }

  }

}
