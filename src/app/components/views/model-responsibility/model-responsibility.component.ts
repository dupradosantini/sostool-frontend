import { Component, OnInit } from '@angular/core';
import { ModelResponsibility } from './model-responsibility.model';
import { ModelResponsibilityService } from './model-responsibility.service';

@Component({
  selector: 'app-model-responsibility',
  templateUrl: './model-responsibility.component.html',
  styleUrls: ['./model-responsibility.component.sass']
})
export class ModelResponsibilityComponent implements OnInit {

  modelResponsibilityArray: ModelResponsibility[] =[];

  selectedModelResponsibility = {} as ModelResponsibility;

  constructor(private service: ModelResponsibilityService) { }

  ngOnInit(): void {
    this.getModelResponsibilities();
  }


  getModelResponsibilities(): void {
    this.service.findAllModelResponsibilities()
    .subscribe({
      next: (response) => {
        this.modelResponsibilityArray = response;
        console.log(this.modelResponsibilityArray);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  createNewModelResponsibility( responsibilityDesc: string, modal: HTMLElement): void {

    const newObj: ModelResponsibility = {
      id: 0,
      description: responsibilityDesc,
      sonResponsibilities: []
    }

    this.service.createNewModelResponsibility(newObj)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.toggleModal(modal);
        alert("ModelResponsibility created succesfully!");
        this.modelResponsibilityArray.push(response);
      },
      error: (errorResp) => {
        console.log(errorResp);
        this.toggleModal(modal);
        alert("Failure creating ModelResponsibility");
      }
    })

  }

  toggleModal(modal: any) {
    modal.classList.toggle('is-active');
  }

  editSelection(modelResponsibility: ModelResponsibility, modal:HTMLElement, descInput:HTMLInputElement){
    this.selectedModelResponsibility = modelResponsibility;
    descInput.value = this.selectedModelResponsibility.description;
    this.toggleModal(modal)
  }

  saveEdit(descInput:HTMLInputElement, modal:HTMLElement){
    let toBeSentModelResp = this.selectedModelResponsibility;
    toBeSentModelResp.description = descInput.value;
    this.service.updateModelResponsibility(toBeSentModelResp)
    .subscribe({
      next: (response) => {
        for(let resp of this.modelResponsibilityArray){
          if(resp.id === response.id){
            resp = response;
          }
        }
        alert("Update Succesfull");
        this.toggleModal(modal);
      },
      error: (errorResp) => {
        alert("Update Failed");
      }
    })
  }



}
