import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-workspace-single',
  templateUrl: './workspace-single.component.html',
  styleUrls: ['./workspace-single.component.sass']
})
export class WorkspaceSingleComponent implements OnInit {

  constructor(private service: WorkspaceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //Extrair o id da url
  }

}
