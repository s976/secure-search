/**
 * Created by shimon on 09/02/2017.
 */
var mammoth = require('mammoth');
var mongoose = require('./db').mongoose;
var Schema = mongoose.Schema;



var docSchema = new Schema({
    file_name      : String,
    path           : String,
    html           : String,
    html_formatted : String, //без никуда
    author         : String, //переводчик
    revisor        : String,
    editor         : String,
    remarks        : String,
    masechet       : String,
    daf            : String,
    username       : String, //кто загрузил
    uploaded_at    : Date,
    updated_at     : Date
});

docSchema.statics.findByKey = function(key,cb){
    var self = this;
    var arr,i,searchPattern='';

    arr = key.split(' ');
    for(i=0;i<arr.length;i++){
        searchPattern+=arr[i] + "\\s*(<[^>]*>\\s*)*\\s*";
    }
    var regex = new RegExp(searchPattern,'gi');


    self.find( {html_formatted: regex} ,function(err,docs){
        var respond = [];
        if(err) console.error(err);

        docs.forEach(function(doc){
            var text, pieces;
            if ( text = doc.toObject().html_formatted ){
                text = text.replace(regex,'<span class="highlight">$&</span>');
                pieces = cutPiece(searchPattern, text, null);
            }
            respond.push({
                doc : doc,
                pieces : pieces
            });
        });

        cb(
            null,
            respond
        );
    } );

    /**
     * Вырезает часть документа, содердащую паттерн внутри этой части
     *
     * @param pattern ключевое слово
     * @param n кол. символов до и после ключевой фразы
     * @returns {string}
     */
    function cutPiece(pattern, text, n) {//TODO: перенести в хорошее место

        var newPattern = "<p>((?!<p>).)*" + pattern + ".*?</p>";
        var regex = new RegExp(newPattern,'ig');
        var result = text.match(regex);

        return result;
    }


};

docSchema.statics.addFile = function(fileObj,cb){
    var self = this;
    var options = {
        styleMap: [
            "u => u"
        ]
    };

    mammoth.convertToHtml( {path: fileObj.path}, options ) //Convert .docx to html
        .then(
            function(result){
                if(!result.value){
                    cb(new Error('Converting error'));
                    return;
                }
                var doc = new self({
                    file_name : fileObj.originalname,
                    path     : fileObj.path,
                    html     : result.value,
                    html_formatted : removeNikkud(result.value),
                    uploaded_at : Date.now()
                });

                doc.save(function(err,file){
                    if (err) {
                        console.error(err);
                        cb(err);
                        return;
                    }
                    cb(null,doc);
                });

            },function(err){
                cb(err);
                console.error(err);
            }
        );

    function removeNikkud(text){
        return text.replace(/[\u05B0-\u05C4]/g,'');
    }

};

/** @class Doc */
var Doc = mongoose.model('Doc', docSchema);


module.exports = Doc;