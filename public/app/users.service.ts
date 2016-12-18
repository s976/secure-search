/**
 * Created by shimon on 04/12/2016.
 */
import { Injectable } from '@angular/core';
import {User} from "./user";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService{
    private usersUrl = 'api/users';

    constructor(private http: Http) { }

    /**
     * Transform date fields from ISODate to local time string
     *
     * @param serverResponse
     * @returns {User | User[]}
     */
    private transformResponse(serverResponse : Response ) : User | User[]{
        let response = serverResponse.json();
        if (response instanceof Array){
            return response.map((user:User)=>{
                user.created_at = new Date(user.created_at).toLocaleString();
                return user;
            });
        } else {
            response.created_at = new Date(response.created_at).toLocaleString();
            return response;
        }
    }

    getUsers() : Promise<User[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(
                response=>this.transformResponse(response),
                error=>{ //on fail
                    throw error.json();
                }
            );
    }

    /**
     * Update user profile
     *
     * @param user User object
     * @returns {Promise<User>} Promise with User updated object from server or error.json() on reject
     */
    updateUser(user : User) : Promise<User> {
        return this.http.post(this.usersUrl + '/' + user._id, user)
            .toPromise()
            .then(
                response => response.json() as User, //on success
                error => {                           //on fail
                    throw error.json();
                }
            );
    }

    /**
     * Add new user
     *
     * @param user User object
     * @returns {Promise<User>} Promise with User updated object from server or error.json() on reject
     */
    newUser(user : User) : Promise<User> {
        return this.http.put(this.usersUrl,user)
            .toPromise()
            .then(
                response => response.json() as User, //on success
                error => {                           //on fail
                    throw error.json();
                }
            );
    }

    deleteUser(user : User) : Promise<any> {
        return this.http.delete(this.usersUrl + '/' + user._id)
            .toPromise()
            .then(
                response => response.json(),
                error => {throw error.json();}
            )
    }


    getUser(id: string): Promise<User> {
        return this.getUsers()
            .then(users => users.find(user => user._id === id));
    }


    login(username:string,password:string) : Promise<any>{
        return this.http.post('api/login',{username:username,password:password})
            .toPromise()
            .then(
                response=>response.json(),
                error => {throw error.json();}
            )
    }


}