# the collections are

1.recipes
2.categories
3.ingredients

# What information will you embed in a document and which will you store normalised?

Both category and ingredient can be either normalized or denormalized, depending on your use case and requirements.

- **Embedded**:

  - Steps → embedded in the recipe document.
  - Ingredients → can be embedded if unique per recipe.
  - Category → can be embedded if simple (like "Main", "Dessert").

- **Normalized**:
  - Ingredients → can be normalized if reused across many recipes.
  - Category → can be normalized if many recipes share the same category.
