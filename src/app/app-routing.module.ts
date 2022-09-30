import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { ModelResponsibilityComponent } from './components/views/model-responsibility/model-responsibility.component';
import { ModelRoleReadComponent } from './components/views/model-role/model-role-read/model-role-read.component';
import { UsersReadComponent } from './components/views/users-read/users-read.component';
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
  },
  {
    path:"model-roles",
    component: ModelRoleReadComponent
  },
  {
    path:"model-responsibility",
    component: ModelResponsibilityComponent
  },
  {
    path:"users",
    component: UsersReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
