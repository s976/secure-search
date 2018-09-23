/**
 *
 * Утилиты для поискла подчеркнутых слов и т.п.
 **/

function Utils(docs) {
    this.docs = docs;
    this.response = {
        allOccurrences : [],
        docs : [],
        message : ''
    };
}

Utils.prototype.italic = function () {
    var that = this;
    this.docs.forEach(function (doc) {
        //console.log(doc.html_formatted);
        var regItalic = /<em>.*?<\/em>/gmi;
        var words = doc.html_formatted.match(regItalic);
        if (!words) return;
        words = words.map(function (word) {
           var regClean = /(<em>\s*)(.*?)([,.;:–?!\s]*<\/em>)/mi;
           var result =word.match(regClean);
           result = result[2];
           return result;
        });

        words = words.filter(function (word) { //Removes empty
           return word;
        });

        words = words.map(function (word) {
           return {word:word,fileName:doc.file_name};
        });

        that.response.allOccurrences = that.response.allOccurrences.concat(words);
    });
    that.response.allOccurrences = removeDuplicatesAndCount(that.response.allOccurrences);
    return that.response;
};

/**
 *
 * @param {obj[]} arr
 */
function removeDuplicatesAndCount(arr){
    let res = [];
    arr.forEach(function (item,i,arr) {
        var index = res.findIndex(function(elem){
            return elem.word === item.word;
        });
        if (index===-1){
            res.push({
                word:item.word,
                fileNames:[item.fileName],
                count:1
            });
        } else {
            res[index].count++;
            if ( (res[index].fileNames.indexOf(item.fileName) === -1) ){
                res[index].fileNames.push(item.fileName);
            }
        }
    });
    res.sort(function (a,b) {
       if (a.word.toLowerCase()<b.word.toLowerCase())
           return -1;
       else
           return 1;
    });
    res = res.map(function (el,key) { //Add id for each element (for front use)
        el.id = key;
       return el;
    });
    return res;
}

module.exports = Utils;