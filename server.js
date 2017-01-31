var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Todo = require('./TodoModel');

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

    app.get('/', (req, res) => res.send('Up and running!'));

    //todo gets and post
    app.get('/todoes', (req, res) => {
        Todo.find({}, (err, todoes) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error!');
            }
            res.send(todoes);
        });
    });

    app.post('/todoes', (req, res) => {
        var todo= new Todo(req.body);
        todo.save((err,td)=>{
            if (err){
                console.log(err);
                res.status(500).send('Internal server error');
            }    
            res.send(td);
        });
    });

    var port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`running on port : ${port}`));

});
