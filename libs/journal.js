/**
 * Created by shimon on 27/05/2017.
 */
var mongoose = require('./db').mongoose;
var Schema = mongoose.Schema;


var journalSchema = new Schema({
    time : Date,
    user_id : String,
    user_name : String,
    ip : String,
    action : String,
    details : String
});

/**
 * @memberOf Journal
 *
 * @param req
 * @param {string} action Like 'search', 'login' etc.
 * @param {string} details
 */
journalSchema.statics.newRecord = function (req, action, details) {
    var userId = ( req.user && req.user._id )? req.user._id : '';
    var userName = ( req.user && req.user.username )? req.user.username : '';
    var record = new this({
        time: Date.now(),
        user_id: userId,
        user_name: userName,
        ip: req.ip,
        action: action,
        details: details
    });

    record.save(function(err,record){
        if (err) console.error(err);
        console.log('New record');
        console.log(record);
    });

};

/** @class Journal */
var Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;