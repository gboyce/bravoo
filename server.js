var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var app = express();
var path = require("path");
// var models = require("./app/models");
var models = require("./models");
var exphbs = require('express-handlebars');
var mysql = require('mysql');
var twilio = require('twilio');

var connection;
var PORT = process.env.PORT || 8080;

// var accountSid = '';
// var authToken = '';
// var client = require('twilio')(accountSid, authToken);
//
// client.messages.create({
//   from: '',
//   to: '',
//   body: "You just sent an SMS from Node.js using Twilio!"
// }, function(err, message) {
//   if(err) {
//     console.error(err.message);
//   }
// });


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.get('/', function(req, res) {
//     res.send('Welcome to Passport with Sequelize');
// });

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("index");
});

// index route loads view.html
//app.get("/", function(req, res) {
//res.sendFile(path.join(__dirname, "./views/index.html"));
//});

//Sync Database
models.sequelize.sync({ force: false }).then(function() {

    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

//for handlebars
// app.set('views', './app/views')
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//routes
// var authRout = require('./app/routes/auth.js')(app, passport);
var authRout = require('./routes/auth.js')(app, passport);
// var authRoute = require('./app/routes/auth.js')(app, passport);
var authRoute = require('./routes/auth.js')(app, passport);

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

//load passport strategies
// require('./app/config/passport/passport.js')(passport, models.user);
require('./config/passport/passport.js')(passport, models.user);

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bravoo'
    });
};

connetion.connect();

app.listen(PORT, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});

