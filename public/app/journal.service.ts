/**
 * Created by shimon on 02/06/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JournalService{
    private journalUrl = 'api/journal';

    constructor(private http: Http){}

    /**
     * Transform date fields from ISODate to local time string
     *
     * @param serverResponse
     * @returns {User | User[]}
     */
    private transformResponse(serverResponse : Response ) : any{
        let response = serverResponse.json();
        if (response instanceof Array){
            return response.map((record:any)=>{
                record.time = new Date(record.time).toLocaleString();
                return record;
            });
        } else {
            response.time = new Date(response.time).toLocaleString();
            return response;
        }
    }

    getRecords(args : any) : Promise<any> {
        return this.http.post(this.journalUrl,args)
            .toPromise()
            .then(
                response=>this.transformResponse(response),
                error=>{
                    throw error.json();
                }
            );
    }

    deleteRecord(record : any) : Promise<any> {
        return this.http.delete(this.journalUrl + '/' + record._id)
            .toPromise()
            .then(
                response => response.json(),
                error => {throw error.json();}
            )
    }

}