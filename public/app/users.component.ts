/**
 * Created by shimon on 04/12/2016.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {UsersService} from "./users.service";
import {User} from "./user";


@Component({
    moduleId: module.id,
    selector : 'users',
    templateUrl : 'users.component.html'
})
export class UsersComponent implements OnInit{
    constructor(private usersService : UsersService ){}

    @ViewChild('editModal') public editModal : ModalDirective;
    @ViewChild('addModal') public addModal : ModalDirective;
    @ViewChild('nameInp') public nameInp : any;
    @ViewChild('editForm') public editForm : any;

    users : User[] = [];
    title = 'Users';
    selectedUser : User;
    editedUser : User = new User(); //temp object for editing process
    editedUser2 : User = new User(); //temp object for update password process
    roles : {roleId:number,roleName:string}[] = [
        {roleId:0, roleName : 'No Role'},
        {roleId:1, roleName : 'Reader'},
        {roleId:2, roleName : 'Editor'},
        {roleId:3, roleName : 'Admin'},
        {roleId:4, roleName : 'Super Admin'}
    ];

    showSuccessMes : boolean = false;
    showErrorMes : boolean = false;
    errorMes : string = '';
    showEditProfileForm : boolean = false;

    errorPwdMes : string = '';
    showPwdSuccessMes : boolean = false;
    showPwdErrMes : boolean = false;
    showPwdForm : boolean = true;

    showNewForm : boolean = true;
    showNewSuccessMes  : boolean = false;
    showNewErrorMes : boolean = false;
    errorNewMes : string = '';

    ngOnInit() : void{
        this.getUsers();
    }

    getUsers(): void {
        this.usersService.getUsers()
            .then(
                users=>this.users=users,
                error=>{
                    console.error(error);
                    alert('Server error');
                }
            );
    }

    editUser(user : User) : void {
        this.selectedUser = user;
        Object.assign(this.editedUser,this.selectedUser);
        Object.assign(this.editedUser2,this.selectedUser); //Process password update separately

        this.showEditProfileForm = true;
        this.showSuccessMes = false;
        this.showErrorMes = false;

        this.showPwdForm = true;
        this.showPwdSuccessMes = false;
        this.showPwdErrMes = false;

        this.editModal.show();
    }

    addUser() : void {
        this.editedUser = new User();

        this.showNewForm =true;
        this.showNewErrorMes = false;
        this.showNewSuccessMes = false;

        this.addModal.show();
    }

    submitNew() : void {
        this.usersService.newUser(this.editedUser)
            .then(
                response => {
                    this.showNewForm = false;
                    this.showNewSuccessMes = true;
                    this.users.push(response);
                },
                error => {
                    console.log('Error from server');
                    console.log(error);
                    this.showNewErrorMes = true;
                    this.errorNewMes = error.errMessage;
                }
            );
    }


    /**
     * On submit update profile form
     */
    submitEdit() : void {
        this.usersService.updateUser(this.editedUser)
           .then(
                response => {
                    this.showEditProfileForm = false;
                    this.showSuccessMes = true;
                    Object.assign(this.selectedUser,response);//Update user in user list

                },
                error => {
                    console.log('Error from server');
                    console.log(error);
                    this.showErrorMes = true;
                    this.errorMes = error.errMessage;
                }
            );
    }

    /**
     * On submit update password
     */
    updatePassword() : void {
        console.log('Reset Password');
        this.usersService.updateUser(this.editedUser2)
            .then(
                response => {
                    this.showPwdForm = false;
                    this.showPwdSuccessMes = true;
                },
                error => {
                    console.log('Error from server');
                    console.log(error);
                    this.showPwdErrMes = true;
                    this.errorPwdMes = error.errMessage;
                }
            );
    }

    deleteUser() : void {
        this.usersService.deleteUser(this.editedUser)
            .then(
                response => {
                    alert(response.message);
                    this.users.forEach((item,i,array)=>{
                        if (item._id === this.editedUser._id){
                            array.splice(i,1);
                        }
                    })

                },
                error => {
                    alert(error.errMessage);
                }
            )
    }

}
