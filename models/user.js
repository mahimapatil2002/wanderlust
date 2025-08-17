const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose =  require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    }
});

userSchema.plugin(passportLocalMongoose);          //ise isliye use kiya h kyo ki yah hashing salting username or password ko direct implement karta h 

module.exports = mongoose.model('User', userSchema);