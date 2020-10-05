const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


const stateCode = 'NY';

// AIRTABLE STUFF

const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyCJifn2RC3KCb2g'}).base('appOrPuThUPb5ioAq');


app.get("/" , function(req, res){

  let allRecords = [];

  base('Table 1').select({

    // SELECT BY STATE
      filterByFormula: `State = '${stateCode}'`,
      pageSize: 100,

  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      allRecords = allRecords.concat(records);

      fetchNextPage();

  }, function done(err) {
      const recordsWithIds = allRecords.map((record) => {
        return {
          id: record.id,
          ...record.fields,
        }
      })

      // Get root element from hierarchy
      const stateRecords = recordsWithIds.filter((record) => !record['Parent Id'] && record['Hierarchy Type'] === 'state')
      const stateRecord =  stateRecords[0];

      const pageRootChildren = recordsWithIds.reduce((accumulator, record) => {
        // console.log('is equal', record['Parent Id'][0], stateRecord.id)

        record['Parent Id'] && record['Parent Id'][0] === stateRecord.id
          ? accumulator[record['Hierarchy Type']] = record
          : accumulator

          return accumulator
      }, {})


console.log(pageRootChildren);
      // TODO: Add children (sections) to the pageRootChildren

      res.render('index', {records: pageRootChildren});

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
