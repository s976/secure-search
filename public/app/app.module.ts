import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import {FileSelectDirective, FileDropDirective} from "ng2-file-upload";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { UsersComponent } from './users.component';
import {UsersService} from "./users.service";
import {HomeComponent} from "./home.component";
import { ManageDocsComponent } from './manage-docs.component';



@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule,
      Ng2BootstrapModule
  ],
  declarations: [
      AppComponent,
      UsersComponent,
      HomeComponent,
      ManageDocsComponent,
      FileSelectDirective,
      FileDropDirective
  ],
    bootstrap:    [ AppComponent ],
    providers: [UsersService],
})
export class AppModule { }