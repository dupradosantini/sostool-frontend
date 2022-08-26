import { Component, OnInit, Input } from '@angular/core';
import { Roles } from '../workspace.model';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.sass']
})
export class TeamViewComponent implements OnInit {

  @Input() teamAssignedRoles: Roles[] = [];

  constructor() { }

  ngOnInit(): void {
    this.teamAssignedRoles.sort(this.compare);
    console.log(this.teamAssignedRoles);
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


}
