## Columns that violate 1NF?

`food_code` and `food_desc` contain multiple values in a single cell (comma-separated), which breaks the rule of atomic values.

## What entities do you recognize that could be extracted?

- Members: identified by member_id, with member_name and member_address
- Dinners: identified by dinner_id and dinner_date
- Venues: identified by venue_code and venue_description
- FoodItems: identified by food_code and food_desc
- Dinner_Food (junction): links each dinner_id to one or more food_code values

## Name all the tables and columns that would make a 3NF compliant solution.

3NF-Compliant Tables and Columns:

1.Members
-member_id (PK)
-member_name
-member_address

2.Venues
-venue_code (PK)
-venue_description

3.FoodItems
-food_code (PK)
-food_desc

4.Dinners
-dinner_id (PK)
-member_id (FK → Members.member_id)
-dinner_date
-venue_code (FK → Venues.venue_code)

5.Dinner_Food (junction table).
-dinner_id (FK → Dinners.dinner_id).
-food_code (FK → FoodItems.food_code).
(PK = composite key of dinner_id + food_code).
