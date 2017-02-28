/**
 * Created by shimon on 18/01/2017.
 */
import {Component, OnInit, Directive} from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DocsService } from './docs.service';
import {Doc} from "./doc";


const URL = 'api/file';


@Component({
    moduleId : module.id,
    selector : 'manage-docs',
    templateUrl : 'manage-docs.component.html',
})
export class ManageDocsComponent implements OnInit{
    constructor(private docsSevice : DocsService){}

    docs : Doc[] = [];

    ngOnInit() : void{
        this.getDocs();
    }

    getDocs() : void {
        this.docsSevice.getDocs()
            .then(
                docs=>this.docs=docs,
                error=>{
                    console.error(error);
                    alert('Server error');
                }
            );
    }

    public uploader:FileUploader = new FileUploader({url: URL});
    public hasBaseDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }
}

