const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const firstRecipes = {
  title: 'banana cake',
  level: 'Easy Peasy',
  ingredients: ['banana', 'milk', 'egg', 'vanilla essence'],
  cuisine: 'American',
  image: 'cake',
  dishType: 'breakfast',
  creator: 'kalmy',
  duration: 45,
  created: 1995,
};
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    seedDatabase();
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

async function seedDatabase() {
  try {
    await Recipe.deleteMany();

    const createdRecipe = await Recipe.create(firstRecipes);
    const createdAllRecipe = await Recipe.insertMany(data);
    await updateRecipe();
    await deleteRecipe();
    console.log('title', createdRecipe.title);

    createdAllRecipe.forEach((recipe) => {
      console.log(recipe.title);
    });
    mongoose.disconnect();
  } catch (e) {
    console.error(e);
  }
}

async function updateRecipe() {
  const query = { title: 'Rigatoni alla Genovese' };
  const updateDuration = await Recipe.findOneAndUpdate(
    query,
    {
      duration: 100,
    },
    //print the new value that updated
    { new: true }
  );
  console.log('updDuration', updateDuration);
}

async function deleteRecipe() {
  const deleteDuration = await Recipe.deleteOne({
    title: 'Carrot Cake',
  });
}
