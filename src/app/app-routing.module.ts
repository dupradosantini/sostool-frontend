import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { WorkspaceReadComponent } from './components/views/workspace/workspace-read/workspace-read.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"workspaces",
    component:WorkspaceReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
