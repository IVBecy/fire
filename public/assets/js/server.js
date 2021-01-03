const express = require("express");
const path = require("path");
const user = require("./user");
const bodyParser = require("body-parser") ;
const db_connection = require("./connect");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { Session } = require("inspector");
const csrf = require("csurf")
const csrfProtection = csrf({ cookie: true })
const cookieParser = require("cookie-parser")
const app = express();
const port = 8000;
//Function for finding records in the database
const findResources = (model,name) => {
  model.findOne({"username":name}).then(data => {
    console.log(data);
    return data
  }).catch(err => {
    console.log(err);
  })
}
// Delete all data
const deleteAllData = async () => {
  try {
    await user.deleteMany();
    console.log("All Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
};
//middleware
app.set("view engine", "ejs"); 
app.set('views', path.join(process.cwd(), '/public/views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({secret: "BillyTheSloth",resave: true,saveUninitialized: true}))
app.listen(port)
console.log(`Server up at 127.0.0.1:${port}`);
// main page
app.get("/", csrfProtection,(req,res) => {
  res.render("index", { csrf_token: req.csrfToken()});
})
// Sign up 
app.post('/signup', (req,response) => {
  var newUser = new user({
    username: escape(req.body.username),
    password: bcrypt.hashSync(escape(req.body.password),10),
    email: escape(req.body.email),
    collect:"",
  })
  newUser.save().then(() => { 
    console.log("New user is in the DB");
    var Sess = req.session;
    Sess.username = escape(req.body.username);
    response.redirect("board")
    app.get("/board", csrfProtection,(req, res) => {
      res.render("board", { session: Sess, username: Sess.username, csrf_token: req.csrfToken(),collect:[]})
      res.end()
      })
    }).catch(err => { 
    //Duplicate key error
    if (err.code == 11000){
      res.render("error", { error_msg: "This email / username already exists." })
      res.end();
    }
    else{
      res.render("error", { error_msg: err })
      res.end();
    }
  })
});
// Sign in
app.post("/signin",csrfProtection,(req,response) => {
  const postUsername = escape(req.body.username);
  const postPassword = req.body.password;
  user.findOne({"username":postUsername}, (err,res) => {
    if (err) throw err;
    else{
      if (res){
        if (bcrypt.compareSync(postPassword, res.password)){
          var Sess = req.session;
          Sess.username = postUsername;
          response.redirect("board")
          app.get("/board", csrfProtection,(req, rspns) => {
            rspns.render("board", { session: Sess, username: Sess.username, csrf_token: req.csrfToken(),collect:res.collect})
            rspns.end()
          })
        }
        else{
          response.render("error",{error_msg:"Wrong password"});
          response.end();
        }
      }
      else{
        response.render("error", { error_msg: `${postUsername} is not a user.`});
        response.end();
      }
    }
  })
});
//Creating new cards
app.post("/create-card", (request,response) => {
  const newData = {
    card_name: request.body.card_name,
    parent: request.body.parent_element,
  };
  // Find all data
  user.findOne({ "username": request.body.username}).then(data => {
    // Append new data
    user.updateOne({ "username": request.body.username }, { $addToSet: { collect: newData }}, (err,res) => {
      if (err) {
        res.render("error",{error_msg:err})
      }
      else {
        findResources(user,request.body.username)
        app.get("/board", csrfProtection, (req, res) => {
          res.render("board", { session: Sess, username: Sess.username, csrf_token: req.csrfToken(),collect:data.collect })
          res.end()
        })
        response.redirect("board");
      }
    })
  }).catch(err => {
    response.render("error",{error_msg:err});
    response.end();
  })
})
