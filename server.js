var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var todoesApi = require('./api/todoes_api');
var Todo = require('./models/TodoModel');

var app = express();
var dbPath = process.env.MONGODB_URI || "mongodb://localhost/app1";
var db;

app.use(bodyParser({encoded:false}))
mongoose.connect(dbPath, (err, database) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Connected to mongodb');

    app.use(express.static('./public',{index:'index.html'}));

    app.get('/', (req, res) => res.send('Up and running!'));

    app.use('/todoes', todoesApi(db));


    var port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`running on port : ${port}`));

});
