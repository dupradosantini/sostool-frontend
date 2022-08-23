import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { HomeComponent } from './components/views/home/home.component';
import { WorkspaceReadComponent } from './components/views/workspace/workspace-read/workspace-read.component';
import { WorkspaceSingleComponent } from './components/views/workspace/workspace-single/workspace-single.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WorkspaceReadComponent,
    WorkspaceSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
