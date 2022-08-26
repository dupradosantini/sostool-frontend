import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teams } from '../workspace.model';
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
  }

  getTeams(): void {
    this.service.findWorkspaceById(this.workspaceId)
    .subscribe({
      next: (response) => {
        this.teamsArray = response.teams;
        console.log(this.teamsArray);
      }
    })
  }

  selectTeam(index: number, tabs: Element): void{
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

}
