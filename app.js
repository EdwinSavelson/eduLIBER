const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');



// AIRTABLE STUFF

const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyCJifn2RC3KCb2g'}).base('appOrPuThUPb5ioAq');







app.get("/" , function(req, res){

  let allRecords = [];

  base('Table 1').select({

    // SELECT BY STATE
      filterByFormula: "State = 'New York'",
      pageSize: 100,

  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      allRecords = allRecords.concat(records);


      //   // PRINT NAME
      //     name = record.get('State');
      //     // console.log(name);

      fetchNextPage();

  }, function done(err) {
      const recordsWithIds = allRecords.map((record) => {
        return {
          id: record.id,
          ...record.fields,
        }
      })

      const stateRecord = recordsWithIds.filter((record) => !record['Parent Id'] && record['Hierarchy Type'] === 'state')

      res.render('index', {records: JSON.stringify(stateRecord)}); // TODO: Get rid of JSON.stringify.

      // TODO: Convert our flat results into a hierarchy.
      // TODO (Cont'd): We do that by making a map of our page data.

      const pageHierarchy = {
        state_details: [],
        covid_resources: [], // Has section -> section_subtitle? -> section_links
        general_resources: [], // Has section -> section_subtitle? -> section_links
      }
      if (err) { console.error(err); return; }
  });


//  res.render('index', {records: JSON.stringify(allRecords)});

})

app.listen(3000, function(){
  console.log("server started on port 3000")
})
