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



}
