const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const recipeSchema = new Schema({
    title: {type: String, unique: true, required: true, trim: true},
    ingredients: {type: [Schema.Types.Mixed], required: true},
    description: {type: [String], required: true},
    picture: {type: String},
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;