const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
 name: { type: String, required: true },
 price: { type: Number, required: true },
 quantity: { type: Number, required: true },
});

const Article = model('Article', articleSchema);

module.exports = Article;