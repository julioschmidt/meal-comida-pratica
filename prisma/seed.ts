const { PrismaClient } = require('@prisma/client');
const images = require('./seeding_data/images.json');
const ingredients = require('./seeding_data/ingredients.json');
const recipe = require('./seeding_data/recipe.json');
const recipeIngredients = require('./seeding_data/recipe_ingredients.json');
const state = require('./seeding_data/state.json');
const cities = require('./seeding_data/cities.json');

const fs = require('fs');
const duckdb = require('duckdb');
const path = require('path');
const { fileURLToPath } = require('url');

const prisma = new PrismaClient()
const ___filename = __filename;
const ___dirname = path.dirname(__filename);
const unixLikeDirname = ___dirname.split(path.sep).join('/'); // Convert to Unix-like path

(async () => {
    let db = new duckdb.Database(':memory');

    db.all(`SELECT * FROM READ_PARQUET('${unixLikeDirname}/seeding_data/ceps.parquet')`, async function (err: any, result: any) {
        if (err) {
            console.error(err);
            return;
        }
        const resultJSON = JSON.stringify(result);

        fs.writeFile(`${unixLikeDirname}/seeding_data/ceps.json`, resultJSON, (writeErr: any) => {
            if (writeErr) {
                console.error(writeErr);
                return;
            }
            console.log('The file has been saved!');

            fs.readFile(`${unixLikeDirname}/seeding_data/ceps.json`, async (readErr: any, data: { toString: () => string; }) => {
                if (readErr) {
                    console.error(readErr);
                    return;
                }
                try {
                    const ceps = JSON.parse(data.toString());
                    const cepsData = ceps.map(({ id, ...data }: { id: number;[key: string]: any }) => data);
                    await prisma.ceps.createMany({ data: cepsData });
                } catch (parseErr) {
                    console.error('Error parsing JSON:', parseErr);
                } finally {
                    fs.unlink(`${unixLikeDirname}/seeding_data/ceps.json`, (err: any) => {
                        if (err) {
                            throw err;
                        }
                        console.log('File removed');
                    })
                }
            });
        });
    });


    const imageData = images.map(({ ...data }) => data)
    await prisma.image.createMany({ data: imageData })

    const ingredientsData = ingredients.map(({ ...data }) => data)
    await prisma.ingredients.createMany({ data: ingredientsData })

    const recipesData = recipe.map(({ ...data }) => data)
    await prisma.recipe.createMany({ data: recipesData })

    const recipeIngredientsData = recipeIngredients.map(({ ...data }) => data)
    await prisma.recipe_ingredients.createMany({ data: recipeIngredientsData })

    const stateData = state.map(({ ...rest }) => rest)
    await prisma.state.createMany({ data: stateData })

    const citiesData = cities.map(({ ...data }) => data)
    await prisma.cities.createMany({ data: citiesData })
})()

