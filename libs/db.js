/**
 * Created by shimon on 03/12/2016.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/talmud');


/**
 * Mongoose instance
 */
exports.mongoose = mongoose;