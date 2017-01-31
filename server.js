var express = require('express');
var mongoose = require('mongoose');

var app = express();
var dbPath = process.env.MONGODB_URI || "mongodb://localhost/app1";
var db;

mongoose.connect(dbPath, (err, database) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Connected to mongodb');

    app.get('/', (req, res) => res.send('Up and running!'));

    var port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`running on port : ${port}`));

});
