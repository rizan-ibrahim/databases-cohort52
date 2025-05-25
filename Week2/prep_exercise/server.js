import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "recipes_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");

  runQueries(connection);
});

// Function to run all queries

const runQueries = (connection) => {
  const vegetarianWithPotatoes = `
    SELECT recipes.name AS recipe
    FROM recipes
    JOIN recipe_ingredients ON recipes.recipeid = recipe_ingredients.recipeid
    JOIN ingredients ON recipe_ingredients.ingredientid = ingredients.ingredientid
    JOIN recipe_categories ON recipes.recipeid = recipe_categories.recipeid
    JOIN categories ON recipe_categories.categoryid = categories.categoryid
    WHERE categories.name = 'vegetarian' AND ingredients.name = 'potatoes';
  `;

  connection.query(vegetarianWithPotatoes, (err, results) => {
    if (err) throw err;
    console.log("Vegetarian Recipes with Potatoes:", results);
  });

  const cakesNoBaking = `
    SELECT recipes.name AS recipe
    FROM recipes
    JOIN recipe_categories AS rc1 ON recipes.recipeid = rc1.recipeid
    JOIN categories AS c1 ON rc1.categoryid = c1.categoryid
    JOIN recipe_categories AS rc2 ON recipes.recipeid = rc2.recipeid
    JOIN categories AS c2 ON rc2.categoryid = c2.categoryid
    WHERE c1.name = 'Cake' 
    AND c2.name = 'No-Bake';
  `;

  connection.query(cakesNoBaking, (err, results) => {
    if (err) throw err;
    console.log("Cakes that do not need baking:", results);
  });

  const veganAndJapanese = `
    SELECT recipes.name as recipe, categories.name as category
    FROM recipes
    JOIN recipe_categories ON recipes.recipeid = recipe_categories.recipeid
    JOIN categories ON recipe_categories.categoryid = categories.categoryid
    WHERE categories.name IN ('Vegan', 'Japanese');
  `;

  connection.query(veganAndJapanese, (err, results) => {
    if (err) throw err;
    console.log("Vegan and Japanese Recipes:", results);
  });
};
