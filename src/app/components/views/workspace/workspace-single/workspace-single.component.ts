import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles, Teams } from '../workspace.model';
import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-workspace-single',
  templateUrl: './workspace-single.component.html',
  styleUrls: ['./workspace-single.component.sass']
})
export class WorkspaceSingleComponent implements OnInit {

  workspaceId: Number;
  teamsArray: Teams[];
  selectedTeam: number;
  workspaceName: String;
  modelRoles: Roles[] = [];
  workspaceRoles: Roles[] = [];

  constructor(private service: WorkspaceService,
    private route: ActivatedRoute,
    private router: Router) {
      this.workspaceId = 0
      this.teamsArray = [];
      this.selectedTeam = 0;
      this.workspaceName = "";
     }

  ngOnInit(): void {
    //Extrair o id da url
    this.route.params.subscribe(params => this.workspaceId = params['id']);
    console.log(this.workspaceId);
    this.getTeams();
    this.getModelRoles();
  }

  getTeams(): void {
    this.service.findWorkspaceById(this.workspaceId)
    .subscribe({
      next: (response) => {
        this.teamsArray = response.teams;
        this.workspaceName = response.name;
        console.log(this.teamsArray);
      }
    })
  }

  getModelRoles(): void {
    this.service.findModelRoles()
    .subscribe({
      next: (response) => {
        this.modelRoles = response;
        console.log(this.modelRoles);
      }
    })
  }

  getWorkspaceRoles(){
    this.service.findWorkspaceRoles(this.workspaceId)
    .subscribe({
      next:(response) => {
        this.workspaceRoles = response;
        console.log(this.workspaceRoles);
      }
    })
  }

  selectTeam(index: number, tabs: Element): void {
    this.selectedTeam = index;
    const children = tabs.children;
    for (var i = 0; i < children.length; i++) {
      var tableChild = children[i];
      // Do stuff
      if(i === index){
        tableChild.setAttribute("class","is-active");
      }else{
        tableChild.setAttribute("class","");
      }
    }
  }

  toggleModal(modal: any) {
    modal.classList.toggle('is-active');
    this.getWorkspaceRoles();
  }

  createRoleInWorkspace(roleName: string, roleDesc: string, modal: HTMLElement): void {

    const placeholderRole: Roles = {
      id: 0,
      name: roleName,
      description: roleDesc
    }
    console.log(placeholderRole);

    this.service.createRoleInWorkspace(this.workspaceId, placeholderRole)
    .subscribe({
      next: (response) => {
        console.log("A resposta recebida (sucesso) foi:" + response);
        this.toggleModal(modal);
        alert("Role Criada com Sucesso");
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
      }
    }
  }

  assignRoleToTeam(selectedRole: string, modal: any){
    this.getWorkspaceRoles();
    //Gets the Id of the selected role
    for(let role of this.workspaceRoles){
      if(role.name = selectedRole){
        const roleId = role.id;
        const teamId = this.teamsArray[this.selectedTeam].id;
        this.service.assignRoleToTeam(this.workspaceId,teamId,roleId)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toggleModal(modal);
            this.ngOnInit();
          }
        })
        break;
      }
    }

  }

}
