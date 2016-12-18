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
/**
 * Created by shimon on 04/12/2016.
 */
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.usersUrl = 'api/users';
    }
    /**
     * Transform date fields from ISODate to local time string
     *
     * @param serverResponse
     * @returns {User | User[]}
     */
    UsersService.prototype.transformResponse = function (serverResponse) {
        var response = serverResponse.json();
        if (response instanceof Array) {
            return response.map(function (user) {
                user.created_at = new Date(user.created_at).toLocaleString();
                return user;
            });
        }
        else {
            response.created_at = new Date(response.created_at).toLocaleString();
            return response;
        }
    };
    UsersService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function (response) { return _this.transformResponse(response); }, function (error) {
            throw error.json();
        });
    };
    /**
     * Update user profile
     *
     * @param user User object
     * @returns {Promise<User>} Promise with User updated object from server or error.json() on reject
     */
    UsersService.prototype.updateUser = function (user) {
        return this.http.post(this.usersUrl + '/' + user._id, user)
            .toPromise()
            .then(function (response) { return response.json(); }, //on success
        function (//on success
            error) {
            throw error.json();
        });
    };
    /**
     * Add new user
     *
     * @param user User object
     * @returns {Promise<User>} Promise with User updated object from server or error.json() on reject
     */
    UsersService.prototype.newUser = function (user) {
        return this.http.put(this.usersUrl, user)
            .toPromise()
            .then(function (response) { return response.json(); }, //on success
        function (//on success
            error) {
            throw error.json();
        });
    };
    UsersService.prototype.deleteUser = function (user) {
        return this.http.delete(this.usersUrl + '/' + user._id)
            .toPromise()
            .then(function (response) { return response.json(); }, function (error) { throw error.json(); });
    };
    UsersService.prototype.getUser = function (id) {
        return this.getUsers()
            .then(function (users) { return users.find(function (user) { return user._id === id; }); });
    };
    UsersService.prototype.login = function (username, password) {
        return this.http.post('api/login', { username: username, password: password })
            .toPromise()
            .then(function (response) { return response.json(); }, function (error) { throw error.json(); });
    };
    UsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map