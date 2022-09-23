import { Component, OnInit, Input } from '@angular/core';
import { ModelResponsibility, Responsibility } from '../../model-responsibility/model-responsibility.model';
import { Roles } from '../workspace.model';
import { WorkspaceService } from '../workspace.service';
import { TeamViewService } from './team-view.service';
import { WorkspaceSingleComponent } from '../workspace-single/workspace-single.component';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.sass']
})
export class TeamViewComponent implements OnInit {

  selectedRole?: Roles;
  addResponsibilityFlag: Boolean = false;
  isNewResponsibilityCreation: boolean = true;

  @Input() teamAssignedRoles: Roles[] = [];
  @Input() workspaceResponsibilities: Responsibility[] = [];
  @Input() workspaceId: Number = 0;
  @Input() modelResponsibilities: ModelResponsibility[] = [];

  lastSelectedModelResponsibility: ModelResponsibility = {
    id:1,
    description:""
  }

  constructor(private service: TeamViewService, private respService: WorkspaceService, private workspaceComponenet: WorkspaceSingleComponent) { }

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

    this.respService.findWorkspaceResponsibilities(this.workspaceId)
        .subscribe({
          next: (response) => {
            this.workspaceResponsibilities = response
          }
    })
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
    finishButton.disabled = true;

    if(elementOn.classList.contains('is-active')){
      elementOn.classList.toggle('is-active');
    }

    if(elementOff.classList.contains('is-active')){
      elementOff.classList.toggle('is-active');
    }

    this.toggleModal(modal);
  }

  finishEdit(selectionValue: string, modal: HTMLElement, responsibilityDescription: string){
    if(!this.isNewResponsibilityCreation){
      this.assignResponsibilityToRole(selectionValue, modal);
    }else{
      this.createResponsibilityInWorkspace(responsibilityDescription, modal)
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



}
