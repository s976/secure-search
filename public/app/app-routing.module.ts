import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent }  from './users.component';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home.component";
import {ManageDocsComponent} from "./manage-docs.component";

const routes: Routes = [
    { path:  '', component: HomeComponent },
    { path: 'users',  component: UsersComponent },
    { path: 'manage-docs',  component: ManageDocsComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}