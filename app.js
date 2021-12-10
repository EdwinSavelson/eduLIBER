const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require('lodash')
require('dotenv').config();
const nodemailer = require("nodemailer");
const request = require("request");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// REQUIRE DATA FOR BOARD MEMBER PAGE
const boardMemberData = require("./public/boardMemberData.js");
// REQUIRE DATA FOR STATE CODES
const stateCodeMap = require("./public/stateCodeMapData.js");
// REQUIRE DATA FOR TEST REVIEW
const badBlogVariable = require("./testBlog");
//GETS RID OF THE WEIRD testBlogData.testBlogData.name THING
const testBlogData = badBlogVariable.testBlogData;

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



//================ROUTES====================

app.get("/content-review", function (req, res) {
  res.render("content-review");
})

app.get("/review-collection", function (req, res) {
  res.render("review-collection");
})

app.get("/test-review", function (req, res) {
  res.render("test-review-template", {
    testBlogData
  });
  console.log(testBlogData);
})

app.get("/reviews/:review", async function (req, res) {
  var reviewRequest = req.params.review;

  // console.log(reviewRequest);

  var review = testBlogData.reviews.find(checkReview => _.trim(checkReview.name) === reviewRequest);
 console.log(review);

 
      res.render("test-review-template", {
        review
      });



  // testBlogData.reviews.forEach(function(review){
  //   var name = _.trim(review.name);
  //   console.log(testBlogData.reviews);
    
  //   if(name === reviewRequest){
  //     res.render("test-review-template", {
  //       review
  //     });
  //   }
  //   else{
  //     res.redirect("/404");
  //   }
 });
  
  async function renderReview(){

  }

app.get("/reviews", function (req, res) {
  res.render("reviews", {
    testBlogData
  });
  console.log(testBlogData);
})



app.get("/board", function (req, res) {
  res.render('boardmembers')
})


app.get("/board/:name", function (req, res) {
  var name = req.params.name;
  res.render("board-member-template", {
    boardMemberData,
    name
  });
  // console.log(boardMemberData[name]);
})

app.get("/faqs", function (req, res) {
  res.render("faqs");
})

app.get("/", function (req, res) {

  res.render('home');

  // function testStateLinks() {
  //   let totalRecords = [];
  //
  //   base('Table 2').select({
  //
  //     filterByFormula: "NOT({LINK} = '')",
  //     pageSize: 100,
  //
  //   }).eachPage(function page(records, fetchNextPage) {
  //     // This function (`page`) will get called for each page of records.
  //     totalRecords = totalRecords.concat(records);
  //     // console.log(recordsWithLinks);
  //
  //     fetchNextPage();
  //   }, function done(err) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     const recordsWithLinks = totalRecords.map((record) => {
  //       return {
  //         id: record.id,
  //         ...record.fields,
  //       }
  //     })
  //     const recordLinks = recordsWithLinks.map((record) => record.Link)
  //     //RETURNS ALL OF THE LINKS IN DATABASE
  //     // console.log(recordLinks[1]);
  //
  //     const errorLinks = [];
  //     recordLinks.forEach(record => {
  //         request(record, function(error, response, body) {
  //           // console.error("error:", error);
  //           // console.log("body:", body);
  //           if (body === undefined || body === null) {} else {
  //             var lowerBody = body.toLowerCase();
  //             var n = lowerBody.includes("not found");
  //             console.log(record);
  //             if (n) {
  //               errorLinks.push(record);
  //               // console.log(errorLinks);
  //             }
  //           }
  //         })
  //
  //     })
  //   })
  //   console.log(errorLinks);
  //   console.log("end");
  // }
  // testStateLinks();
})


app.post("/", function (req, res) {
  var state = req.body.myState;
  stateCode = state;

  console.log(state);

  res.redirect("/");
})

app.get("/404", function (req, res) {
  res.render('404')
})

app.get("/mission_statement", function (req, res) {
  res.render('mission_statement')
})

app.get("/contact", function (req, res) {
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
    from: 'tech@eduliber.org',
    to: 'tech@eduliber.org',
    subject: `${req.body.subject}`,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
    blank: `${req.body.blank}`
  }

  let validate = (mailOpts) =>{
    if(mailOpts.blank !== ""){
      res.render('contact-success')
      console.log("blocked");
    }else{
      smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
          console.log(process.env);
          console.log(error);
          console.log(process.env.EMAIL_USER);
          console.log(process.env.EMAIL_PASS);
          res.render('contact-failure') // Show a page indicating failure
        } else {
          console.log("sent");
          console.log(mailOpts);
          res.render('contact-success') // Show a page indicating success
        }
      })
    }
  }
  
  // Attempt to send the email
  validate(mailOpts);

})

app.get("state", function (req, res) {


  res.render('state_template', {
    records: pageRootChildren,
    hierarchy
  });
  // console.log(JSON.stringify(hierarchy));

})

app.get('/state', async function (req, res) {

  // TODO: to Lowercase state name
  const stateCode = stateCodeMap[req.query.myState] ?
    stateCodeMap[req.query.myState].code :
    null
  // If not, redirect to a 404 error page.
  if (stateCode === null) {
    res.redirect("/404");
  } else {
    renderResourcesForState(stateCode, res, 'state_template');
  }

})


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
    console.log(hierarchy);

  });
}

app.get('*', function (req, res) {
  res.redirect("/404");
});

// CHANGE PORT BEFORE DEPLOYMENT
const port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log("server started on port " + port)
})
