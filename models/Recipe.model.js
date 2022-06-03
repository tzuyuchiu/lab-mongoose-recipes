const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: { type: mongoose.SchemaTypes.String, required: true },
  level: [
    { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ],
  ingredients: [{ type: String }],
  cuisine: { type: mongoose.SchemaTypes.String, required: true },

  dishType: [
    {
      type: String,
      enum: [
        'breakfast',
        'main_course',
        'soup',
        'snack',
        'drink',
        'dessert',
        'other',
      ],
    },
  ],
  image: [
    {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg',
    },
  ],
  creator: mongoose.SchemaTypes.String,
  duration: { type: mongoose.SchemaTypes.Number, min: 0 },
  created: { type: mongoose.SchemaTypes.Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
