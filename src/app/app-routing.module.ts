import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { WorkspaceReadComponent } from './components/views/workspace/workspace-read/workspace-read.component';
import { WorkspaceSingleComponent } from './components/views/workspace/workspace-single/workspace-single.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"workspaces",
    component:WorkspaceReadComponent
  },
  {
    path:"workspaces/:id",
    component: WorkspaceSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
