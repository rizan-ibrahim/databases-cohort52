# Week 3 Prep – Normalization of Food Recipes Database

## Was your database already in 2NF / 3NF?

Yes. My database was already designed to follow 1NF, 2NF, and 3NF principles.

1 Each table contains atomic values (1NF)
2 No column depends on only part of a composite key (2NF)
3 No column depends on another non-key column (3NF)

---

## What changes did you make to normalize your database?

In the unnormalized version:
1 Recipes had repeating product columns like `ingredient1`, `ingredient2`
2 Steps were stored across multiple columns
3 Categories were duplicated directly in the recipes table

After normalization:
1 I created separate tables for `ingredients`, `steps`, and `categories`
2 I used junction tables: `recipe_ingredients`, `recipe_categories`, and `recipe_steps`
3 Each relationship is handled cleanly through foreign keys

See `schema.sql` for the full structure.
