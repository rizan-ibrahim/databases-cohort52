drop database if exists recipes_db;
create database recipes_db;
use recipes_db;

create table recipes(
recipeid int auto_increment primary key,
name varchar (100)

);


create table ingredients(
ingredientID int auto_increment primary key,
name varchar (100)
);

create table categories(
categoryid int auto_increment primary key,
name varchar (100)

);



create table steps(
stepID int auto_increment primary key,
name varchar (100)

);
-- those are the junction  tables


create table recipe_ingredients(
recipeID int ,ingredientID int ,primary key (recipeID, ingredientID),
foreign key (recipeID) references recipes (recipeID) on delete cascade,
foreign key (ingredientID) references ingredients (ingredientID) on delete cascade

);
 

create table recipe_categories(
recipeID int ,categoryID int, primary key (recipeID,categoryID),
foreign key(recipeID) references recipes (recipeID) on delete cascade,
foreign key(categoryid) references categories(categoryid) on delete cascade

);

 create table recipe_steps(
 recipeid int , stepID int , primary key (recipeid,stepID),
 foreign key(recipeid) references recipes (recipeid) on delete cascade,
 foreign key (stepID) references steps (stepID) on delete cascade
 );

-- -- -- inserting 

use recipes_db;
SET SQL_SAFE_UPDATES = 0;
delete from recipes;
delete from categories;
delete from ingredients;
delete from recipe_categories;
delete from recipe_ingredients;
delete from recipe_steps;
delete from steps;
ALTER TABLE recipes AUTO_INCREMENT = 1;
ALTER TABLE ingredients AUTO_INCREMENT = 1;
ALTER TABLE categories AUTO_INCREMENT = 1;
ALTER TABLE steps AUTO_INCREMENT = 1;




insert into recipes (name) values 
('cheesecake'),('roasted brussels sprouts'),
('mac&cheese'),('Tamagoyaki Japanese Omelette');

insert into categories (name) values
('cake'),
('no-bake'),
('vegetarian'),
('Vegan'),
('Gluten-Free'),
('Japanese');


insert into ingredients (name) values
('condensed milk'),
('cream cheese'),
('lemon juice'),
('pie crust'),
('cherry jam'),
('Brussels Sprouts'),
('Sesame seeds'),
('Pepper'),
('Salt'),
('Olive oil'),
('Macaroni'),
('Butter'),
('Flour'),
('Shredded Cheddar cheese'),
('Eggs'),
('Soy sauce'),
('Sugar'),
('potatoes');

insert into steps (name) values 
('beat cream cheese'),
('add condensed milk and blend'),
('add lemon juice and blend'),
('add the mix to pe crust'),
('spread the cherry jam'),
('place in refrigerator for 3h'),
('Preheat the oven'),
('Mix the ingredients in a bowl'),
('Spread the mix on baking sheet'),
('Bake for 30'),
('Cook Macaroni for 8'),
('Melt butter in a saucepan'),
('Add flour, salt, pepper and mix'),
('Add Milk and mix'),
('Cook until mix is smooth'),
('Add cheddar cheese'),
('Add the macaroni'),
('Beat the eggs'),
('Add soy sauce, sugar and salt'),
('Add oil to a sauce pan'),
('Bring to medium heat'),
('Add some mix to the sauce pan'),
('Let it cook for 1'),
('Remove pan from fire'),
('Add oil to a saucepan again'),   
('Add some mix to the saucepan again'),   
('Let it cook for 1 minute again');

-- insert into the junctions tables.

insert into recipe_categories (recipeid,categoryid)
values
(1, 1),  -- No-Bake Cheesecake: Cake
(1, 2),  -- No-Bake Cheesecake: No-Bake
(1, 3),  -- No-Bake Cheesecake: Vegetarian

(2, 4),  -- Roasted Brussels Sprouts: Vegan
(2, 5),  -- Roasted Brussels Sprouts: Gluten-Free

(3, 3),  -- Mac & Cheese: Vegetarian

(4, 3),  -- Tamagoyaki Japanese Omelette: Vegetarian
(4, 6);  -- Tamagoyaki Japanese Omelette: Japanese


insert into recipe_ingredients (recipeid,ingredientid)
values 
(1, 1),  -- No-Bake Cheesecake: Condensed Milk
(1, 2),  -- No-Bake Cheesecake: Cream Cheese
(1, 3),  -- No-Bake Cheesecake: Lemon Juice
(1, 4),  -- No-Bake Cheesecake: Pie Crust
(1, 5),  -- No-Bake Cheesecake: Cherry Jam

(2, 6),  -- Roasted Brussels Sprouts: Brussels Sprouts
(2, 3),  -- Roasted Brussels Sprouts: Lemon Juice
(2, 7),  -- Roasted Brussels Sprouts: Sesame Seeds
(2, 8),  -- Roasted Brussels Sprouts: Pepper
(2, 9),  -- Roasted Brussels Sprouts: Salt
(2, 10), -- Roasted Brussels Sprouts: Olive Oil

(3, 11), -- Mac & Cheese: Macaroni
(3, 12), -- Mac & Cheese: Butter
(3, 13), -- Mac & Cheese: Flour
(3, 9),  -- Mac & Cheese: Salt
(3, 8),  -- Mac & Cheese: Pepper
(3, 14), -- Mac & Cheese: Milk
(3, 15), -- Mac & Cheese: Shredded Cheddar Cheese
(3,18),


(4, 15), -- Tamagoyaki Japanese Omelette: Eggs
(4, 16), -- Tamagoyaki Japanese Omelette: Soy Sauce
(4,17),  -- Tamagoyaki Japanese Omelette: Sugr
(4, 9),  -- Tamagoyaki Japanese Omelette: Salt
(4, 10); -- Tamagoyaki Japanese Omelette: Olive Oil


insert into recipe_steps (recipeid,stepID)
values 
(1, 1),  -- No-Bake Cheesecake: Beat Cream Cheese
(1, 2),  -- No-Bake Cheesecake: Add Condensed Milk and Blend
(1, 3),  -- No-Bake Cheesecake: Add Lemon Juice and Blend
(1, 4),  -- No-Bake Cheesecake: Add the Mix to the Pie Crust
(1, 5),  -- No-Bake Cheesecake: Spread the Cherry Jam
(1, 6),  -- No-Bake Cheesecake: Place in Refrigerator for 3h

(2, 7),  -- Roasted Brussels Sprouts: Preheat the Oven
(2, 8),  -- Roasted Brussels Sprouts: Mix the Ingredients in a Bowl
(2, 9),  -- Roasted Brussels Sprouts: Spread the Mix on Baking Sheet
(2, 10), -- Roasted Brussels Sprouts: Bake for 30 minutes

(3, 11), -- Mac & Cheese: Cook Macaroni for 8 minutes
(3, 12), -- Mac & Cheese: Melt Butter in a Saucepan
(3, 13), -- Mac & Cheese: Add Flour, Salt, Pepper, and Mix
(3, 14), -- Mac & Cheese: Add Milk and Mix
(3, 15), -- Mac & Cheese: Cook Until Mix is Smooth
(3, 16), -- Mac & Cheese: Add Cheddar Cheese
(3, 17), -- Mac & Cheese: Add the Macaroni

(4, 18), -- Tamagoyaki Japanese Omelette: Beat the Eggs
(4, 19), -- Tamagoyaki Japanese Omelette: Add Soy Sauce, Sugar, and Salt
(4, 20), -- Tamagoyaki Japanese Omelette: Add Oil to a Saucepan
(4, 21), -- Tamagoyaki Japanese Omelette: Bring to Medium Heat
(4, 22), -- Tamagoyaki Japanese Omelette: Add Some Mix to the Saucepan
(4, 23), -- Tamagoyaki Japanese Omelette: Let It Cook for 1 minute
(4, 24), -- Tamagoyaki Japanese Omelette: Add Oil to a Saucepan Again
(4, 25), -- Tamagoyaki Japanese Omelette: Add Some Mix to the Saucepan Again
(4, 26), -- Tamagoyaki Japanese Omelette: Let It Cook for 1 minute Again
(4, 27); -- Tamagoyaki Japanese Omelette: Remove Pan from Fire

