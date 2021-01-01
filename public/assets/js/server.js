// To generate page with express
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
// Serving
app.use(express.static('public'));
app.get("/",(req,res) => {
  res.sendFile(path.join(process.cwd(),"./public/index.html"));
})
app.listen(port)
console.log(`Server up at 127.0.0.1:${port}`);
