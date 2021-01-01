const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const user = require("./user");
const bodyParser = require("body-parser") ;
const db_connection = require("./connect");
const bcrypt = require("bcrypt");
//Function for finding records in the database
const findResources = () => {
  user.find({ }, "username email password", function (err, res) {
    if (err) throw err;
    console.log(res);
  })
}
findResources();
// Delete all data
const deleteAllData = async () => {
  try {
    await user.deleteMany();
    console.log("All Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
};
//deleteAllData()
// Serving + routes + middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.listen(port)
console.log(`Server up at 127.0.0.1:${port}`);
// main page
app.get("/",(req,res) => {
  res.sendFile("public/index.html");
})
// board
app.get("/board", (req, res) => {
  res.sendFile("public/board.html",{root:process.cwd()});
})
console.log(process.cwd());
// Sign up 
app.post('/signup', (req,res) => {
  var newUser = new user({
    username: escape(req.body.username),
    password: bcrypt.hashSync(escape(req.body.password),10),
    email: escape(req.body.email),
  })
  newUser.save().then(() => { 
    console.log("New user is in the DB");
    res.redirect("board")
    res.end()
    }).catch(err => { 
    //Duplicate key error !!!!(will switch to ajax later)!!!!
    if (err.code == 11000){
      console.log("Duplicate key");
      res.redirect("../error.html?err=Duplicate-Key")
      res.end()
    }
    else{
      console.log(err);
      res.redirect(`../error.html?err=${err}`)
      res.end()
    }
  })
});
