/**
 * Created by shimon on 21/05/2017.
 *
 * Готовит (преобразует) данные для ответа на запрос поиска
 */

var settings = require('../settings');

function PrepareRes(docs){
    this.originalDocs = docs;
    this.response = {
        docs : [],
        message : ''
    };
}

/**
 * Удаляет лишние результаты (если их слишком много)
 * и заполняет поле this.response
 *
 */
PrepareRes.prototype.limit = function(){
    var chunks = 0;
    var limitDocsLength = settings.MAX_DOCS;
    var docs = [], doc;

    for(var i=0;i< this.originalDocs.length; i++){

        if ( chunks >= settings.MAX_CHUNKS || i >= settings.MAX_DOCS){
            //значит этот документ уже не нужен
            limitDocsLength = i;
            break;
        }

        doc = this.originalDocs[i];
        doc.doc.html = '';
        doc.doc.html_formatted = '';


        if (doc.pieces.length > settings.MAX_CHUNKS_IN_DOC ){
            doc.message = 'Некоторые отрывки документа скрыты';
            doc.pieces.length = settings.MAX_CHUNKS_IN_DOC;
        }

        chunks += doc.pieces.length;

        docs.push(doc);
    }

    this.response.docs = docs;
    if(docs.length<this.originalDocs.length){
        this.response.message = 'Показана только часть документов';
    }
};


module.exports = PrepareRes;
