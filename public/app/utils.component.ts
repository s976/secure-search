/**
 * Created by shimon on 11/06/2018.
 */
import {Component, OnInit} from '@angular/core';
import {DocsService} from "./docs.service";
import {Occurrence} from "./doc";

/*
interface  Occurrence{
    word:string,
    fileNames:string[],
    count:number
}
*/

@Component({
    moduleId : module.id,
    selector : 'utils',
    templateUrl : 'utils.component.html',
})
export class UtilsComponent{
    constructor(private docsService : DocsService){}

    fileName : string;
    occurrences : Occurrence[];

    utilsSearch(type : string) : void {
        let args = {
            fileName: this.fileName,
            type: type
        };
        this.docsService.searchUtils(args)
            .then(
                result =>{
                    console.log(result);
                    this.printOccurrences(result.allOccurrences);
                },
                error=>{}
            );
    }



    printOccurrences(occurrences : Occurrence[] ) : void {
        this.occurrences = occurrences;
    }
}

