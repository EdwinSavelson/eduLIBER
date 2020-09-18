const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , function(req, res){
  console.log(req);
  res.sendFile(__dirname + "/state.html");
})

app.listen(3000, function(){
  console.log("server started on port 3000")
})
