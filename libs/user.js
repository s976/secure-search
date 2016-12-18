var mongoose = require('./db').mongoose;
var Schema = mongoose.Schema;
const crypto = require('crypto');


var userSchema = new Schema({
    //id : Number,
    name: {type:String, default: ''},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt : String,
    email: { type: String, required: true },
    role: {type:Number,default:0}, //0-no role, 1-reader, 4-super admin
    created_at: Date,
    updated_at: Date
});

/**
 * Add new user
 * @memberOf User
 * @param {Object} fields
 * @param {Function} cb
 */
userSchema.statics.addUser = function (fields,cb) {
    var salt = crypto.randomBytes(48).toString('hex');
    var user = new this({
        username : fields.username,
        password : this.hashPwd(fields.password, salt),
        salt : salt,
        email : fields.email,
        name : fields.name ? fields.name : '',
        role : fields.role ? fields.role : 0,
        created_at : Date.now()
    });
    user.save(function(err,user){
        if (err) console.error(err);
        cb(err,user);
    });
};

userSchema.statics.hashPwd = function(pwd, salt){
    const hash = crypto.createHash('sha256');
    hash.update(pwd + salt);
    return hash.digest('hex');
};

userSchema.methods.updatePwd = function (pwd) {
    this.password =  this.model('User').hashPwd(pwd,this.salt);
};


userSchema.methods.checkPwd = function (pwd) {
    return this.model('User').hashPwd(pwd,this.salt) == this.password;
};

userSchema.methods.cry = function () {
    console.log(this.username + ' say uaaaaaaaa!!!');
};

/** @class User */
var User = mongoose.model('User', userSchema);

module.exports = User;