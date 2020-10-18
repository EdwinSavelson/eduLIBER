const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require('lodash')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');


const stateCode = 'AL';

// AIRTABLE STUFF

const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyCJifn2RC3KCb2g'}).base('appOrPuThUPb5ioAq');


app.get("/" , function(req, res){

  let allRecords = [];

  base('Table 2').select({

    // SELECT BY STATE
      filterByFormula: `State = '${stateCode}'`,
      pageSize: 100,

  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      allRecords = allRecords.concat(records);

      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }

      const recordsWithIds = allRecords.map((record) => {
        return {
          id: record.id,
          ...record.fields,
        }
      })

      const recordsWithParentId = recordsWithIds.filter((record) => record['Parent Id'])

      // Get root element from hierarchy
      const stateRecords = recordsWithIds.filter((record) => (
        !record['Parent Id']
        && record['Hierarchy Type'] === 'state'
      ))

      const stateRecord =  stateRecords[0];

      const pageRootChildren = recordsWithParentId.reduce((accumulator, record) => {
        // console.log('is equal', record['Parent Id'][0], stateRecord.id)
        record['Parent Id'][0] === stateRecord.id
          ? accumulator[record['Hierarchy Type']] = record
          : accumulator

          return accumulator
      }, {})


      //Gets the root id of covid resources
      const covidResourcesId = recordsWithParentId.filter((record) => (
        record['Hierarchy Type'] === 'covid_resources'
        && record['Parent Id'][0].id
      ))

      const getChildren = (parent) => {
        const children = recordsWithParentId.filter((record) => (
          record['Parent Id'][0] === parent.id
        ))

        return {
          id: parent.id,
          type: parent['Hierarchy Type'],
          description: parent.Description || '',
          link: parent.Link || null,
          tag: parent.tag || '',
          children: children.map((child) => getChildren(child)),
        }
      }

      const hierarchy = _.reduce(pageRootChildren, (pageObject, pageRoot, key) => (
        _.set(pageObject, key, getChildren(pageRoot))
      ), {})

      res.render('WidaTemplate', {records: pageRootChildren, hierarchy });
// console.log(JSON.stringify(hierarchy));

  });

})

app.get("/board" , function(req, res){
  res.render('boardmembers')
})


app.listen(3000, function(){
  console.log("server started on port 3000")
})
