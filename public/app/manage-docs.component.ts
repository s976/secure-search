/**
 * Created by shimon on 18/01/2017.
 */
import {Component, OnInit, Directive, ViewChild} from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DocsService } from './docs.service';
import {Doc} from "./doc";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";


const URL = 'api/file';


@Component({
    moduleId : module.id,
    selector : 'manage-docs',
    templateUrl : 'manage-docs.component.html',
})
export class ManageDocsComponent implements OnInit{
    constructor(private docsService : DocsService){}

    @ViewChild('docModal') public docModal : ModalDirective;

    docs : Doc[] = [];
    selectedDoc : Doc;
    editedDoc : Doc = new Doc();
    showEditSuccessMes : boolean = false;
    showEditErrorMes : boolean = false;
    errorNewMes : string = '';



    ngOnInit() : void{
        this.getDocs();
    }

    getDocs() : void {
        this.docsService.getDocs()
            .then(
                docs=>this.docs=docs,
                error=>{
                    console.error(error);
                    alert('Server error');
                }
            );
    }

    editDoc(doc : Doc ) : void{
        this.selectedDoc = doc;
        Object.assign(this.editedDoc, this.selectedDoc);
        this.showEditSuccessMes = false;
        this.showEditErrorMes = false;
        this.errorNewMes = '';
        this.docModal.show();
        console.log(doc);
    }

    submitDoc() : void {
        this.docsService.updateDoc(this.editedDoc)
            .then(
                response => {
                    Object.assign(this.selectedDoc,response);
                    this.showEditSuccessMes = true;
                },
                error => {
                    console.log('Error from server');
                    console.log(error);
                    if(error.errMessage){
                        this.showEditErrorMes = true;
                        this.errorNewMes = error.errMessage;
                    }
                }
            );
    }

    deleteDoc() : void {
        this.docsService.deleteDoc(this.editedDoc)
            .then(
                response => {
                    this.showEditErrorMes = true; //Контейнер ошибки используется для удобства. Никакой ошибки тут нет
                    this.errorNewMes = response.message;
                },
                error => {
                    console.log('Error from server');
                    console.log(error);
                    if(error.errMessage){
                        this.showEditErrorMes = true;
                        this.errorNewMes = error.errMessage;
                    }
                }
            );
    }




    public uploader:FileUploader = new FileUploader({url: URL});
    public hasBaseDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }
}

