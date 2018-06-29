/**
 * Created by shimon on 13/02/2017.
 */
import { Injectable } from '@angular/core';
import {Doc, Occurrence, UtilsResult} from './doc';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DocsService{
    private docsUrl = 'api/docs';
    private searchUrl = 'api/search';
    private utilsUrl = 'api/utils';

    constructor(private http: Http){}

    /**
     * Transform date fields from ISODate to local time string
     *
     * @param serverResponse
     * @returns {User | User[]}
     */
    private transformResponse(serverResponse : Response ) : Doc | Doc[]{
        let response = serverResponse.json();
        if (response instanceof Array){
            return response.map((doc:Doc)=>{
                doc.uploaded_at = new Date(doc.uploaded_at).toLocaleString();
                return doc;
            });
        } else {
            response.uploaded_at = new Date(response.uploaded_at).toLocaleString();
            return response;
        }
    }

    getDocs() : Promise<Doc[]> {
        return this.http.get(this.docsUrl)
            .toPromise()
            .then(
                response=>this.transformResponse(response),
                error=>{
                    throw error.json();
                }
            );
    }

    updateDoc(doc : Doc) : Promise<Doc> {
        return this.http.post(this.docsUrl + '/' + doc._id, doc)
            .toPromise()
            .then(
                response => this.transformResponse(response), //on success
                error => {                           //on fail
                    throw error.json();
                }
            );
    }

    deleteDoc(doc : Doc) : Promise<any> {
        return this.http.delete(this.docsUrl + '/' + doc._id)
            .toPromise()
            .then(
                response => response.json(),
                error => {throw error.json();}
            )
    }

    searchDocs(key : string) : Promise<Doc[]>{
        return this.http.get(this.searchUrl + '/' + key)
            .toPromise()
            .then(
                response=>this.transformResponse(response),
                error=>{
                    throw error.json();
                }
            );
    }

    searchUtils(args : any) : Promise<UtilsResult>{
        return this.http.post(this.utilsUrl, args)
            .toPromise()
            .then(
                response => this.transformResponse(response),
                error => {
                    throw error.json();
                }
            );
    }

}