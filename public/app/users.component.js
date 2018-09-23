"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by shimon on 04/12/2016.
 */
var core_1 = require("@angular/core");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var users_service_1 = require("./users.service");
var user_1 = require("./user");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(usersService) {
        this.usersService = usersService;
        this.users = [];
        this.title = 'Users';
        this.editedUser = new user_1.User(); //temp object for editing process
        this.editedUser2 = new user_1.User(); //temp object for update password process
        this.roles = [
            { roleId: 0, roleName: 'No Role' },
            { roleId: 1, roleName: 'Reader' },
            { roleId: 2, roleName: 'Editor' },
            { roleId: 3, roleName: 'Admin' },
            { roleId: 4, roleName: 'Super Admin' }
        ];
        this.showSuccessMes = false;
        this.showErrorMes = false;
        this.errorMes = '';
        this.showEditProfileForm = false;
        this.errorPwdMes = '';
        this.showPwdSuccessMes = false;
        this.showPwdErrMes = false;
        this.showPwdForm = true;
        this.showNewForm = true;
        this.showNewSuccessMes = false;
        this.showNewErrorMes = false;
        this.errorNewMes = '';
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.usersService.getUsers()
            .then(function (users) { return _this.users = users; }, function (error) {
            console.error(error);
            alert('Server error');
        });
    };
    UsersComponent.prototype.editUser = function (user) {
        this.selectedUser = user;
        Object.assign(this.editedUser, this.selectedUser);
        Object.assign(this.editedUser2, this.selectedUser); //Process password update separately
        this.showEditProfileForm = true;
        this.showSuccessMes = false;
        this.showErrorMes = false;
        this.showPwdForm = true;
        this.showPwdSuccessMes = false;
        this.showPwdErrMes = false;
        this.editModal.show();
    };
    UsersComponent.prototype.addUser = function () {
        this.editedUser = new user_1.User();
        this.showNewForm = true;
        this.showNewErrorMes = false;
        this.showNewSuccessMes = false;
        this.addModal.show();
    };
    UsersComponent.prototype.submitNew = function () {
        var _this = this;
        this.usersService.newUser(this.editedUser)
            .then(function (response) {
            _this.showNewForm = false;
            _this.showNewSuccessMes = true;
            _this.users.push(response);
        }, function (error) {
            console.log('Error from server');
            console.log(error);
            _this.showNewErrorMes = true;
            _this.errorNewMes = error.errMessage;
        });
    };
    /**
     * On submit update profile form
     */
    UsersComponent.prototype.submitEdit = function () {
        var _this = this;
        this.usersService.updateUser(this.editedUser)
            .then(function (response) {
            _this.showEditProfileForm = false;
            _this.showSuccessMes = true;
            Object.assign(_this.selectedUser, response); //Update user in user list
        }, function (error) {
            console.log('Error from server');
            console.log(error);
            _this.showErrorMes = true;
            _this.errorMes = error.errMessage;
        });
    };
    /**
     * On submit update password
     */
    UsersComponent.prototype.updatePassword = function () {
        var _this = this;
        console.log('Reset Password');
        this.usersService.updateUser(this.editedUser2)
            .then(function (response) {
            _this.showPwdForm = false;
            _this.showPwdSuccessMes = true;
        }, function (error) {
            console.log('Error from server');
            console.log(error);
            _this.showPwdErrMes = true;
            _this.errorPwdMes = error.errMessage;
        });
    };
    UsersComponent.prototype.deleteUser = function () {
        var _this = this;
        this.usersService.deleteUser(this.editedUser)
            .then(function (response) {
            alert(response.message);
            _this.users.forEach(function (item, i, array) {
                if (item._id === _this.editedUser._id) {
                    array.splice(i, 1);
                }
            });
        }, function (error) {
            alert(error.errMessage);
        });
    };
    __decorate([
        core_1.ViewChild('editModal'),
        __metadata("design:type", ng2_bootstrap_1.ModalDirective)
    ], UsersComponent.prototype, "editModal", void 0);
    __decorate([
        core_1.ViewChild('addModal'),
        __metadata("design:type", ng2_bootstrap_1.ModalDirective)
    ], UsersComponent.prototype, "addModal", void 0);
    __decorate([
        core_1.ViewChild('nameInp'),
        __metadata("design:type", Object)
    ], UsersComponent.prototype, "nameInp", void 0);
    __decorate([
        core_1.ViewChild('editForm'),
        __metadata("design:type", Object)
    ], UsersComponent.prototype, "editForm", void 0);
    UsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'users',
            templateUrl: 'users.component.html'
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map