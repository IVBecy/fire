"Use strict"
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true},
  password:{ type: String},
  email: { type: String, unique: true},
  collect: []
})
module.exports = mongoose.model("user",userSchema)