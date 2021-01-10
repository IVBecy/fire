"Use strict"
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
var Sess;
//Function for finding records in the database
const findResources = () => {
  user.findOne({}).then(data => {
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
app.disable("x-powered-by")
app.set("view engine", "ejs"); 
app.set('views', path.join(process.cwd(), '/public/views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({secret: "BillyTheSloth",resave: true,saveUninitialized: true, httpOnly: true,}))
app.listen(port)
console.log(`Server up at 127.0.0.1:${port}`);
// main page
app.get("/", csrfProtection,(req,res) => {
  res.render("index", { csrf_token: req.csrfToken()});
})
app.get("/board", csrfProtection, (req, res) => {
  for(var i in Sess.collect){
    Sess.collect[i].card_name = decodeURI(Sess.collect[i].card_name)
  };
  res.render("board",{session:Sess,username:Sess.username,csrf_token:req.csrfToken(),collect:Sess.collect})
})
// Sign up 
app.post('/signup', (req,response) => {
  var newUser = new user({
    username: encodeURI(req.body.username),
    password: bcrypt.hashSync(encodeURI(req.body.password),10),
    email: encodeURI(req.body.email),
    collect:"",
  })
  newUser.save().then(() => { 
    console.log(`${req.body.username} is in the database.`);
    Sess = req.session;
    Sess.username = encodeURI(req.body.username);
    response.redirect("board")
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
  const postUsername = encodeURI(req.body.username);
  const postPassword = req.body.password;
  user.findOne({"username":postUsername}, (err,res) => {
    if (err) {response.render("error",{error_msg:err})}
    else{
      if (res){
        if (bcrypt.compareSync(postPassword, res.password)){
          Sess = req.session;
          Sess.username = postUsername;
          Sess.collect = res.collect;
          response.redirect("board")
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
    card_name: encodeURI(request.body.card_name),
    parent: encodeURI(request.body.parent_element),
  };
  // Append new data
  user.updateOne({ "username": request.body.username }, { $addToSet: { collect: newData } }, (err, res) => {
    if (err) {
      res.render("error", { error_msg: err })
    }
    else {
      user.findOne({ "username": request.body.username }).then(data => {
        Sess.collect = data.collect;
      }).catch(err => {
        response.render("error",{error_msg:err})
      })
      response.redirect("board");
    }
  })
})
// Moving a card to a new list
app.post("/move-list",(req,res) => {
  user.findOne({"username":req.body.username}).then(() => {
    user.updateOne({ "collect.card_name": req.body.card_name }, { $set: { "collect.$.parent": req.body.parent } }, (err, response) => {
      if (err) { res.render("error",{error_msg:err}) }
      else {
        user.findOne({ "username": req.body.username }).then(data => {
          Sess.collect = data.collect;
          res.redirect("board");
        }).catch(err => {
          res.render("error", { error_msg: err })
        })
      }
    })
  }).catch(err => {console.log(err);})
});
// Delete cards
app.post("/delete-card",(req, res) => {
  user.findOne({ "username": req.body.username }).then(() => {
    user.updateOne({ "username": req.body.username }, { $pull:{"collect":{"card_name":req.body.card_name}}}, (err, response) => {
      if (err) { res.render("error", { error_msg: err }) }
      else {
        user.findOne({ "username": req.body.username }).then(data => {
          Sess.collect = data.collect;
          res.redirect("board");
        }).catch(err => {
          res.render("error", { error_msg: err })
        })
      }
    })
  }).catch(err => { console.log(err); })
})