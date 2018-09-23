/**
 * Created by shimon on 13/02/2017.
 */
export class Doc {
    _id: string;
    file_name      : string;
    path           : string;
    html           : string;
    html_formatted : string; //без никуда
    author         : string; //переводчик
    revisor        : string;
    editor         : string;
    remarks        : string;
    masechet       : string;
    daf            : string;
    username       : string; //кто загрузил
    uploaded_at    : string;
    updated_at     : string;
}

export interface Occurrence{
    word:string,
    fileNames:string[],
    count:number,
    id:number
}

export interface UtilsResult{
    allOccurrences : Occurrence[],
    docs : any,
    message : any
}