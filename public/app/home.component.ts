/**
 * Created by shimon on 05/12/2016.
 */
import { Component } from '@angular/core';
import { DocsService } from './docs.service';
import {Doc} from "./doc";

@Component({
    moduleId : module.id,
    selector : 'home',
    templateUrl : 'home.component.html'
})
export class HomeComponent {
    constructor(private docsService : DocsService){}

    searchUrl = 'api/search';
    keyword : string;
    results : any;
    resultDocs : any;
    resultMessage : string;

    search(key : string) : void {
        this.docsService.searchDocs(key)
            .then(
                docs =>{
                    console.log(docs);
                    this.outputResults(docs);
                },
                error=>{}
            );
    }

    outputResults(results: any) : void {
        this.resultDocs = results.docs;
        this.resultMessage = results.message;
    }

}