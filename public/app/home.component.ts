/**
 * Created by shimon on 05/12/2016.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import { DocsService } from './docs.service';
import {Doc} from "./doc";

@Component({
    moduleId : module.id,
    selector : 'home',
    templateUrl : 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    constructor(private docsService : DocsService){}

    searchUrl = 'api/search';
    keyword : string;
    results : any;
    resultDocs : any;
    resultMessage : string;
    descriptionMsg : string;


    search(key : string) : void {
        this.descriptionMsg = '';
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
        this.descriptionMsg = "Поиск: <strong>" + this.keyword + "</strong>";
        if (results.docs.length == 0) {
            this.descriptionMsg += "<p><i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i> Ничего не нашли...</p>"
        } else {
            this.descriptionMsg += "<p>Количество документов: " + results.docs.length + "</p>" ;
        }
    }

    bindNoteClick(event: any): void {
        if (event.target.tagName === 'A' && event.target.href.indexOf('#footnote') != -1) {
            event.preventDefault();
            alert('Сноски (пока) так смотреть нельзя. Извините.');
        }
    }

    ngOnInit()  {
        document.addEventListener('click', this.bindNoteClick);
    }

    ngOnDestroy() {
        document.removeEventListener('click', this.bindNoteClick);
    }
}