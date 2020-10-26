const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require('lodash')
require('dotenv').config();
const nodemailer= require("nodemailer");

// RECAPTCHA SITE KEY 6Ld-INoZAAAAACsWVusp03WAfJUuE3u2JHtxWSfs

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');


var stateCode = '';

// AIRTABLE STUFF

const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base('appOrPuThUPb5ioAq');


app.get("state", function(req, res) {


  res.render('state_template', {
    records: pageRootChildren,
    hierarchy
  });
  // console.log(JSON.stringify(hierarchy));


})

app.get("/board", function(req, res) {
  res.render('boardmembers')
})

app.get("/mia-allen", function(req, res) {
  res.render('mia-allen')
})


app.get("/", function(req, res) {

  res.render('home');

})

app.post("/", function(req, res) {
  var state = req.body.myState;
  stateCode = state;


  console.log(state);

  res.redirect("/");
})

app.get("/404", function(req, res) {
  res.render('404')
})

app.get("/mission_statement", function(req, res) {
  res.render('mission_statement')
})

app.get("/contact", function(req, res) {
  res.render('contact')
})

app.post('/contact', (req, res) => {

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // Specify what the email will look like
  const mailOpts = {
    from: 'tech@eduliber.org', // This is ignored by Gmail
    to: 'tech@eduliber.org',
    subject: 'New message from contact form at tylerkrys.ca',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(process.env);
      console.log(error);
      console.log(process.env.EMAIL_USER);
      console.log(process.env.EMAIL_PASS);
      // res.render('contact-failure') // Show a page indicating failure
    }
    else {
      console.log("sent");
      // res.render('contact-success') // Show a page indicating success
    }
  })
})

app.get('/state', async function(req, res) {

  // TODO: to Lowercase state name
  const stateCode = stateCodeMap[req.query.myState]
  ?stateCodeMap[req.query.myState].code
  : null
  // If not, redirect to a 404 error page.
  if(stateCode === null){
    res.redirect("/404");
  }else{
  renderResourcesForState(stateCode, res, 'state_template');
  }


})

const stateCodeMap = {
  'Alabama': {
    code: 'AL',
  },
  'Alaska': {
    code: 'AK',
  },
  'American Samoa': {
    code: 'AS',
  },
  'Arizona': {
    code: 'AZ',
  },
  'Arkansas': {
    code: 'AR',
  },
  'Bureau of Indian Education': {
    code: 'BIE',
  },
  'California': {
    code: 'CA',
  },
  'Colorado': {
    code: 'CO',
  },
  'Connecticut': {
    code: 'CT',
  },
  'Delaware': {
    code: 'DE',
  },
  'Department of Defense': {
    code: 'DD',
  },
  'District of Columbia': {
    code: 'DC',
  },
  'Florida': {
    code: 'FL',
  },
  'Georgia': {
    code: 'GA',
  },
  'Hawaii': {
    code: 'HI',
  },
  'Idaho': {
    code: 'ID',
  },
  'Illinois': {
    code: 'IL',
  },
  'Indiana': {
    code: 'IN',
  },
  'Iowa': {
    code: 'IA',
  },
  'Kansas': {
    code: 'KS',
  },
  'Kentucky': {
    code: 'KY',
  },
  'Louisiana': {
    code: 'LA',
  },
  'Maine': {
    code: 'ME',
  },
  'Maryland': {
    code: 'MD',
  },
  'Massachusetts': {
    code: 'MA',
  },
  'Michigan': {
    code: 'MI',
  },
  'Minnesota': {
    code: 'MN',
  },
  'Mississippi': {
    code: 'MS',
  },
  'Missouri': {
    code: 'MO',
  },
  'Montana': {
    code: 'MT',
  },
  'Nebraska': {
    code: 'NE',
  },
  'Nevada': {
    code: 'NV',
  },
  'New Hampshire': {
    code: 'NH',
  },
  'New Jersey': {
    code: 'NJ',
  },
  'New Mexico': {
    code: 'NM',
  },
  'New York': {
    code: 'NY',
  },
  'North Carolina': {
    code: 'NC',
  },
  'North Dakota': {
    code: 'ND',
  },
  'Ohio': {
    code: 'OH',
  },
  'Oklahoma': {
    code: 'OK',
  },
  'Oregon': {
    code: 'OR',
  },
  'Pennsylvania': {
    code: 'PA',
  },
  'Rhode Island': {
    code: 'RI',
  },
  'South Carolina': {
    code: 'SC',
  },
  'South Dakota': {
    code: 'SD',
  },
  'Tennessee': {
    code: 'TN',
  },
  'Texas': {
    code: 'TX',
  },
  'Utah': {
    code: 'UT',
  },
  'Vermont': {
    code: 'VT',
  },
  'Virginia': {
    code: 'VA',
  },
  'Washington': {
    code: 'WA',
  },
  'West Virginia': {
    code: 'WV',
  },
  'Wisconsin': {
    code: 'WI',
  },
  'Wyoming': {
    code: 'WY',
  },
}

async function renderResourcesForState(stateCode, response, template) {
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
    if (err) {
      console.error(err);
      return;
    }

    const recordsWithIds = allRecords.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      }
    })

    const recordsWithParentId = recordsWithIds.filter((record) => record['Parent Id'])

    // Get root element from hierarchy
    const stateRecords = recordsWithIds.filter((record) => (
      !record['Parent Id'] &&
      record['Hierarchy Type'] === 'state'
    ))

    const stateRecord = stateRecords[0];

    const pageRootChildren = recordsWithParentId.reduce((accumulator, record) => {
      // console.log('is equal', record['Parent Id'][0], stateRecord.id)
      record['Parent Id'][0] === stateRecord.id ?
        accumulator[record['Hierarchy Type']] = record :
        accumulator

      return accumulator
    }, {})

    //Gets the root id of covid resources
    const covidResourcesId = recordsWithParentId.filter((record) => (
      record['Hierarchy Type'] === 'covid_resources' &&
      record['Parent Id'][0].id
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

    const result = {
      records: pageRootChildren,
      hierarchy,
    }

    response.render(template, result);
console.log(hierarchy.general_resources.children);

  });
}

app.get('*', function(req, res){
  res.redirect("/404");
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("server started on port " + port)
})
