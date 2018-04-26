let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    body: {
        type: String
    }
});

let Article = module.exports = mongoose.model('Article', articleSchema);