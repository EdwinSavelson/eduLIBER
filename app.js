const express = require("express");
const app = express();

app.set('view engine', 'ejs');



// AIRTABLE STUFF

const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyCJifn2RC3KCb2g'}).base('appOrPuThUPb5ioAq');

let info;

base('Table 1').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        // console.log('Retrieved', record.get('State'));
        info = record.get('State');
        console.log(info);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});











const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , function(req, res){
  console.log(req);
  // res.sendFile(__dirname + "/state.html");
  res.render('index', {newYorkState: info});
})

app.listen(3000, function(){
  console.log("server started on port 3000")
})
