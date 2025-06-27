// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req, res, next) {
  const params = req.params;
  const path = req.path.replace(/^\/|\/$/g, "").split("/");

  if (!path[1]) {
    const dateObj = new Date();

    return res.send({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  }

  next();
}).get("/api/:date", function(req, res) {
  const date = req.date || req.params.date;

  const dateObj = date ? new Date(Number(date) ? Number(date) : date) : new Date();

  if (isNaN(dateObj))
    return res.send({ error: "Invalid Date" });

  res.send({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
