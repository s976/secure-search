/**
 * Created by shimon on 11/06/2018.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class UtilsComponent implements OnInit, OnDestroy{
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

    bindInfoClick(event : any) : void {
        let oldPopups = document.getElementsByClassName('file-names-table');
        for (let i=0;i<oldPopups.length;i++){
            oldPopups[i].parentNode.removeChild(oldPopups[i]);
        }

        if ( event.target.hasAttribute('el-id')) {
            let key = event.target.attributes['el-id'].value;
            let fileNamesHtml = "<table class='table table-striped'><tr><td>" +
                this.occurrences[key].fileNames.join("</td></tr><tr><td>") +
                "</td></tr>";
            let div = document.createElement('div');
            div.className = "file-names-table";
            div.innerHTML = "<h4>" + this.occurrences[key].word +"</h4>" + fileNamesHtml;
            event.target.appendChild(div);
        }
    }

    ngOnInit()  {
        document.addEventListener('click', this.bindInfoClick.bind(this));
    }

    ngOnDestroy() {
        document.removeEventListener('click', this.bindInfoClick);
    }
}

