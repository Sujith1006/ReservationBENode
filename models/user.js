var mongoose = require("mongoose");
var schema = mongoose.Schema;

// schema.path("_id");
var users = new schema({
  name: String,
  email: {type:String,index:{unique:true}},
  password: String,
});

var Users = mongoose.model('users',users);
module.exports = Users; 