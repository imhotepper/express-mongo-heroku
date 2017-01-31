var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    title: String,
    completed: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);