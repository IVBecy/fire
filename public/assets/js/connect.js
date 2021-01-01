// Script that connect to the DB
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set('useCreateIndex', true);
const mongo = "localhost:27017";
const DB = "fire_db";
//Connecting database
const db_connection =  mongoose.connect(`mongodb://${mongo}/${DB}`).then(() => { console.log(`Connected to mongodb://${mongo}/${DB}`); }).catch((err) => console.log(err));