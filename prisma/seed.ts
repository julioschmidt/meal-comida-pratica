import { PrismaClient } from '@prisma/client'
import images from "./seeding_data/images.json" assert { type: "json" }
import ingredients from "./seeding_data/ingredients.json" assert { type: "json" }
import recipe from "./seeding_data/recipe.json" assert { type: "json" }
import recipeIngredients from "./seeding_data/recipe_ingredients.json" assert { type: "json" }
import state from "./seeding_data/state.json" assert { type: "json" }
import cities from "./seeding_data/cities.json" assert { type: "json" }

import fs from 'fs'
import duckdb from 'duckdb';
import path from "path";
import { fileURLToPath } from 'url';

const prisma = new PrismaClient()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const unixLikeDirname = __dirname.split(path.sep).join('/'); // Convert to Unix-like path

let db = new duckdb.Database(':memory');

db.all(`SELECT * FROM READ_PARQUET('${unixLikeDirname}/seeding_data/ceps.parquet')`, async function (err: any, result: any) {
    if (err) {
        console.error(err);
        return;
    }
    const resultJSON = JSON.stringify(result);

    fs.writeFile(`${unixLikeDirname}/seeding_data/ceps.json`, resultJSON, (writeErr) => {
        if (writeErr) {
            console.error(writeErr);
            return;
        }
        console.log('The file has been saved!');

        fs.readFile(`${unixLikeDirname}/seeding_data/ceps.json`, async (readErr, data) => {
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
                fs.unlink(`${unixLikeDirname}/seeding_data/ceps.json`, err => {
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



