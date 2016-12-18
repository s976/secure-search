import { Component } from '@angular/core';
import {UsersService} from "./users.service";

@Component({
    moduleId : module.id,
    selector : 'login',
    templateUrl : 'login.component.html'
})
export class LoginComponent {
    constructor (private usersService : UsersService){}

    username : string = '';
    password : string = '';

    login() : void {
        this.usersService.login(this.username,this.password)
            .then(
                response => {
                    console.log(response);
                },
                error => {
                    console.log(error);
                }
            )
    }
}