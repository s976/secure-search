/**
 * Created by shimon on 02/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {JournalService} from "./journal.service";


@Component({
    moduleId : module.id,
    selector : 'journal',
    templateUrl : 'journal.component.html',
})
export class JournalComponent implements OnInit{
    constructor(private journalService : JournalService){}

    records : any[] = [];


    ngOnInit() : void{
        this.getRecords();
    }

    getRecords() : void {
        this.journalService.getRecords()
            .then(
                records=>this.records=records,
                error=>{
                    console.error(error);
                    alert('Server error');
                }
            );
    }

    deleteRecord(record:any) : void{
        console.log('delete:');
        console.log(record);
    }

}

