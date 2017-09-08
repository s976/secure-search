/**
 * Created by shimon on 03/12/2016.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/talmud');


/**
 * Mongoose instance
 */
exports.mongoose = mongoose;