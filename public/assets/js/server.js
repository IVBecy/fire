// To generate page with express
const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set('useCreateIndex', true);
const mongo = "localhost:27017";
const DB = "fire_db";
const user = require("./user");
//Connecting database
mongoose.connect(`mongodb://${mongo}/${DB}`).then(() => { console.log(`Connected to mongodb://${mongo}/${DB}`); }).catch((err) => console.log(err));
//Function for finding records in the database
const findResources = (model,record,name) => {
  model.find({record:name},record,(err,res) => {
    if (err) throw err;
    console.log(res);
  });
  user.find({ 'username': 'John' }, 'username', function (err, res) {
    if (err) throw err;
    console.log(res);
  })
}
// Delete all data
const deleteAllData = async () => {
  try {
    await user.deleteMany();
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};
// Serving
app.use(express.static('public'));
app.get("/",(req,res) => {
  res.sendFile(path.join(process.cwd(),"./public/index.html"));
})
app.listen(port)
console.log(`Server up at 127.0.0.1:${port}`);