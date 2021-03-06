import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent }  from './users.component';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home.component";
import {ManageDocsComponent} from "./manage-docs.component";
import {JournalComponent} from "./journal.component";

const routes: Routes = [
    { path:  'home', component: HomeComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'users',  component: UsersComponent },
    { path: 'manage-docs',  component: ManageDocsComponent },
    { path: 'journal',  component: JournalComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}