var express = require('express');
var Todo = require('../models/TodoModel');

var router = express.Router();

//function init(db){
function init(){
//todo gets and post
    router.get('/', (req, res) => {
        Todo.find({}, (err, todoes) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error!');
            }
            res.send(todoes);
        });
    });

    router.post('/', (req, res) => {
        var todo= new Todo(req.body);
        todo.save((err,td)=>{
            if (err){
                console.log(err);
                res.status(500).send('Internal server error');
            }    
            res.send(td);
        });
    });

    return router;
}

module.exports = init;