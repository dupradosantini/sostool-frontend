import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workspace } from '../workspace.model';
import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-workspace-read',
  templateUrl: './workspace-read.component.html',
  styleUrls: ['./workspace-read.component.sass']
})
export class WorkspaceReadComponent implements OnInit {

  workspaceArray: Workspace[] = [];

  constructor(private service: WorkspaceService, private router: Router) { }

  ngOnInit(): void {
    this.getWorkspaces();
  }

  getWorkspaces(): void {
    this.service.findWorkspaces()
    .subscribe({
      next: (response) => {
        this.workspaceArray = response;
        console.log(this.workspaceArray);
      },
      error: () => {
        console.log("Error loading workspaces");
      }
    })
  }

  goToWorkspace(id: Number){
    const pageURI = `workspaces/${id}`;
    this.router.navigate([`${pageURI}`])
  }

}
