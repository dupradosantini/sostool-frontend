import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { HomeComponent } from './components/views/home/home.component';
import { WorkspaceReadComponent } from './components/views/workspace/workspace-read/workspace-read.component';
import { WorkspaceSingleComponent } from './components/views/workspace/workspace-single/workspace-single.component';
import { TeamViewComponent } from './components/views/workspace/team-view/team-view.component';
import { ModelRoleReadComponent } from './components/views/model-role/model-role-read/model-role-read.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { ModelResponsibilityComponent } from './components/views/model-responsibility/model-responsibility.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { UsersReadComponent } from './components/views/users-read/users-read.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WorkspaceReadComponent,
    WorkspaceSingleComponent,
    TeamViewComponent,
    ModelRoleReadComponent,
    FooterComponent,
    ModelResponsibilityComponent,
    UsersReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
