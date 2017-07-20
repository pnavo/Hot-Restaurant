var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

var tables = []

var waitlist = []

// Specifies path names and linked files
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"))
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"))
});

app.get("/api/waitlist", function(req, res) {
    res.json(waitlist)
});

app.get("/api/tables", function(req, res) {
    res.json(tables)
})

// allow users to reserve
app.post("/api/new", function(req,res) {
    var newReservation = req.body;
    if (tables.length <= 5) {
        tables.push(newReservation);
        res.json(newReservation);
    } else {
        waitlist.push(newReservation);
        res.json(newReservation);
    };
})

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
})