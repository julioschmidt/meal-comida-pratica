const { PrismaClient } = require('@prisma/client');
const images = require('./seeding_data/images.json');
const ingredients = require('./seeding_data/ingredients.json');
const recipe = require('./seeding_data/recipe.json');
const recipeIngredients = require('./seeding_data/recipe_ingredients.json');
const state = require('./seeding_data/state.json');
const cities = require('./seeding_data/cities.json');

const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

const prisma = new PrismaClient()
const ___filename = __filename;
const ___dirname = path.dirname(__filename);
const unixLikeDirname = ___dirname.split(path.sep).join('/'); // Convert to Unix-like path

(async () => {
    const imageData = images.map(({ ...data }) => data)
    await prisma.image.createMany({ data: imageData })

    const ingredientsData = ingredients.map(({ ...data }) => data)
    await prisma.ingredients.createMany({ data: ingredientsData })

    const recipesData = recipe.map(({ ...data }) => data)
    await prisma.recipe.createMany({ data: recipesData })

    const recipeIngredientsData = recipeIngredients.map(({ ...data }) => data)
    await prisma.recipe_ingredients.createMany({ data: recipeIngredientsData })
})()

