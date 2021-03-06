const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require('lodash')
require('dotenv').config();
const nodemailer = require("nodemailer");
const request = require("request");
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


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

const boardMemberData = {
  "Beth-Skelton": {
    "name": "Beth Skelton - Chair",
    "img": "BethSkeltonHeadshot.png",
    "bio": " Beth has over 30 years of experience as a language educator and holds a Master’s Degree in Multicultural Teacher Education. She has worked with early childhood, elementary, middle, high school and adult language learners in rural, urban, suburban, and international school settings. She has extensive experience and training in Kagan cooperative learning, student centered instructional coaching, Harvard Project Zero and Visible Thinking Routines, SIOP, and Comprehensible Input Strategies. She has published materials for teaching adult English Learners with the TPRS method entitled Putting it Together, which have been translated into Spanish, Dutch, French, and sign language. She is a founding member and chair of the Eduliber board and member of the MyEdExpert Board.  Beth currently provides professional development, coaching, and consulting with schools around the world focused on providing equitable education for multilingual learners."
  },
  "Mia-Allen": {
    "name": "Mia Allen - Founder",
    "img": "MiaAllenHeadshot.png",
    "bio": "Mia Ariela Allen is the Founder and Director of Professional Learning for Denver-based 4Ed Consulting. The organization is focused on improving programmatic structures and creating equitable learning opportunities for English Language Learners. Mia is currently completing dissertation work focused on English Language Learning programs for newcomer and refugee students that have timed-out or dropped-out of a traditional secondary school model. \n\n    Mia earned her first Masters at the University of Norther Colorado-Greely focused on Elementary Education and Culturally and Linguistically Diverse Students. Mia then went on to study at the University of Colorado-Boulder in the Bueno Center program- focused on bilingual special education. Mia has taught and coached in Denver Public schools and then went on to work in the digital publishing industry creating and support English Language Development and Spanish bilingual and biliteracy-based support resources. During this time in the publishing industry, Mia had the opportunity to provide WIDA-based workshops for many consortium member states. \n\n    Mia served as the Director of ELL and Bilingual Services for non-profit organization in Philadelphia where she assisted with an i3 scale grant in Broward County Schools (Florida), Denver Public Schoo(Colorado), Elizabeth Public Schools (New Jersey), Houston Independent School District. In her tenure, Mia supported the development of English language development resources and materials to create sheltered-learning and coaching aligned to early literacy development across the i3 project. Mia currently is working with school districts in Colorado, Illinois and New Mexico to develop language-rich learning enviornments that support cross-curricular English Language Development",
  },
  "Erin-Lyman": {
    "name": "Erin Lyman - Treasurer",
    "img": "ErinLymanHeadshot.png",
    "bio": "Erin Lyman lives in Denver, Colorado and co-owner of the tax and accounting firm Newton Street CPA. Erin spends her time with her husband David Marsh and their two dogs Moses and Abel."
  },
  "Chanda-Austin": {
    "name": "Chanda Austin - Member",
    "img": "ChandaAustinHeadshot.png",
    "bio": " Chanda Austin is a native of Tuscaloosa, AL and currently resides in Atlanta, GA. She holds a B.S. and a M.Ed. from Alabama A&amp;M University, Normal, AL and an Ed. S in School Leadership from Cambridge College, Cambridge, MA. She has been an educator for over twenty years serving in several different capacities and is passionate about people and learning. As a board member of EduLiber, her wealth of experiences in providing equable, sustainable learning opportunities to culturally and linguistically diverse students and educators will support strategic planning. She is a proud mother of an amazing, talented teenage girl."
  },
  "Israa-Hussein": {
    "name": "Israa-Hussein - Member",
    "img": "IsraaHusseinHeadshot.png",
    "bio": "I am not a native to the education system but I have been an active member since 2009. I have a Bachelor's degree Psychology and I am currently pursuing a Masters in Healthcare policy. I believe in EduLIBER’s mission because I have first hand experience in how detrimental and ineffective some educators can be when it comes to second language learners and minorities."
  },
  "Joshua-Allen": {
    "name": "Joshua Allen - Friend of the Board",
    "bio": "Josh Allen is the Director of Technical Architecture and Strategy for Denver Public Schools (DPS). His position facilitates the enterprise and solutions architecture across both the academic and operations of Denver Public Schools. DPS is the fastest growing school district in the nation and as a result DPS has invested significantly in technology that allows Teachers, Principals, Students and Parents to manage their data in our district created portals. In his role, Josh ensures the success of the solutions that are implemented in schools, as well as central departments. Throughout his 20 years at DPS,  Josh has managed the district’s distance learning program, set up the district’s website, helped to build the first public school teacher pay for performance system and managed the district’s development, data warehouse and business intelligence teams.  Josh is a fourth generation Coloradoan and a former ECE and Montessori teacher",
  },
  "Jennifer-Archuleta": {
    "name": "Jennifer Archuleta-Secretary",
    "bio": "Jennifer has been in education for over 15 years and holds a Master’s Degree in Teaching and a principal license. She worked primarily with early childhood and in elementary settings before moving into the business side of education. She has extensive experience and training in educational assessment and grant writing. She is a founding member of the Eduliber board.  Beth currently provides grants programming and fiscal management for federal, state, and local grants for a Colorado school district."
  },
  "Marc-Liebman": {
  "name": "Marc B. Liebman, Ph.D. -Friend of the Board",
  "img": "MarcBLiebmanHeadshot.png",
  "bio": "Marc is all about children and their success and helping them become successful learners, responsible citizens and tomorrow’s leaders. He has degrees in History, Human Development and Education and spent the first almost 40 years of his professional life as an educator in the public schools of California spending the first 8 years as a teacher and the last 18 as a district superintendent. He has also been a principal consultant for IBM and has just retired from being the CAO and Imagine Learning, an educational software company. Along the way he was named one of the 25 top education technology advocates in the United States and, with his wife of 49 years, founded and continue to operate the Mindy and Marc Liebman Scholarship Foundation. The foundation focuses on helping high risk, high potential students finish their schooling and getting their college degrees with a focus on giving back to their communities and helping others as part of their becoming our future leaders."
  }
}

app.get("/board/:name", function(req, res) {
  var name = req.params.name;
  res.render("board-member-template", {
    boardMemberData,
    name
  });
  // console.log(boardMemberData[name]);
})

app.get("/faqs",function(req,res){
  res.render("faqs");
})

app.get("/", function(req, res) {

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
  //       request(record, function(error, response, body) {
  //         // console.error("error:", error);
  //         // console.log("body:", body);
  //         if (body === undefined || body === null) {} else {
  //           var lowerBody = body.toLowerCase();
  //           var n = lowerBody.includes("not found");
  //           // console.log(n);
  //           if (n) {
  //             errorLinks.push(record);
  //             console.log(errorLinks);
  //           }
  //
  //         }
  //
  //       })
  //     })
  //
  //   })
  //
  // }
  //
  // testStateLinks();

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
    from: 'tech@eduliber.org',
    to: 'tech@eduliber.org',
    subject: `${req.body.subject}`,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(process.env);
      console.log(error);
      console.log(process.env.EMAIL_USER);
      console.log(process.env.EMAIL_PASS);
      res.render('contact-failure') // Show a page indicating failure
    } else {
      console.log("sent");
      res.render('contact-success') // Show a page indicating success
    }
  })
})

app.get('/state', async function(req, res) {

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
  'Department of Defense Education Activity': {
    code: 'DODEA',
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
  'U.S. Virgin Islands': {
    code: 'VI'
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

app.get('*', function(req, res) {
  res.redirect("/404");
});
//
// CHANGE PORT BEFORE DEPLOYMENT
const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("server started on port " + port)
})
