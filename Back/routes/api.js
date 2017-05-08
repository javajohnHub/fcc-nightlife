const yelp = require('yelp-fusion');

var token = ""

yelp.accessToken("cLtRtRiTihjntorYxDRUdA", "zLt1ruLJdfouqYAKUALRAaf7ulREjDMTTwcp1hv9zXqtW69AMTvFdiVMGplqtvzV").then(response => {
  token = response.jsonBody.access_token;
}).catch(e => {
  console.log(e);
});

var express = require('express');
var fs = require('fs');
var router = express.Router();
var cookieParser = require('cookie-parser')
var session = require('express-session')
router.use(cookieParser()) // required before session.
router.use(session({ secret: 'keyboard cat' }))
var passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());

//Setup passport
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    login(username, password, function (status) {
      if (status) {
        //Logged in
        return done(null, {
          username: username.toLowerCase()
        });
      } else {
        //Failed to login
        return done(null, false);
      }
    });
  }
));

function requireAuth(req, res, next) {
  console.log(req.user)
  if (!req.user) {
    res.send("Not Authenticated")
  } else {
    //Already logged in
    next();
  }
};

function login(username, password, callback) {
  //Add secure logic here
  callback(true)
}

//Handle login session destruction
router.get("/logout", function (req, res) {
  req.logout();
  req.session.destroy();
  res.send("Logged out")
});

router.all("/login", passport.authenticate('local'), function (req, res) {

  res.send("Welcome " + req.user.username);
});

//Respond with ajax
router.all('/search/:location', function (req, res, next) {
  const client = yelp.client(token);
  client.search({
    term: 'Bar',
    location: req.params.location
  }).then(response => {

    var goingObject = {}
    fs.readdir("data/", function (err, files) {
      files.forEach(function (file, nth) {
        fs.readFile("data/" + file, function (rerr, data) {
          var goingCount = rerr ? 0 : JSON.parse(data).length
          goingObject[file] = goingCount;

          if (nth + 1 == files.length) {
            var toReturn = [];
            response.jsonBody.businesses.forEach(function (business) {
              toReturn.push({
                id: business.id,
                name: business.name,
                image: business.image_url,
                going: goingObject[business.id] ? goingObject[business.id] : 0
              })
            })
            console.log(goingObject);
            res.send(JSON.stringify(toReturn))
          }
        })
      })
    })



  }).catch(e => {
    console.log(e);
  });
});

router.all("/go/:placeid", requireAuth, function (req, res, next) {
  fs.readFile("data/" + req.params.placeid, function (err, placeFile) {
    var placeData = err ? [] : JSON.parse(placeFile);
    if (placeData.indexOf(req.user.username) !== -1) {
      res.send("Already Going")
      return;
    }
    placeData.push(req.user.username)
    fs.writeFile("data/" + req.params.placeid, JSON.stringify(placeData), () => {
      res.send("Now Going")
    })
  })
})

router.all("/leave/:placeid", requireAuth, function (req, res, next) {
  fs.readFile("data/" + req.params.placeid, function (err, placeFile) {
    var placeData = err ? [] : JSON.parse(placeFile);
    if (placeData.indexOf(req.user.username) === -1) {
      res.send("Already Left")
      return;
    }
    placeData.splice(placeData.indexOf(req.user.username), 1);
    fs.writeFile("data/" + req.params.placeid, JSON.stringify(placeData), () => {
      res.send("Now Left")
    })
  })
})

module.exports = router;
