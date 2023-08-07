# MealBinder MERN stack

## Demostration

https://mealbinder.netlify.app/

## User Stories

### Background

MealBinber 📒 is a platform designed to help people store their recipes and plan their daily meal plans.

Users can also gather their meal plan insight.

Users can easily join by signing up with their email address. Once registered, they gain access to a personalized dashboard where they can efficiently manage their recipe collection, search for specific recipes, and seamlessly add them to their desired day.

### Authentication

- As a user, I can sign up for an account with my email address.
- As a user, I can login with my email and password.
- As a user, I can stay signed in after refreshing the page.

### User ( coming soon )

- As a user, I can view my profile.
- As a user, I can update my profile
- As a user, I can delete my profile

### Recipes

- As a user, I can create a new recipe with:
  - a list of measurement and ingredients 🌽
  - an image
  - a list of tags
  - an instruction
- As a user, I can view a recipe.
- As a user, I can edit a recipe.
- As a user, I can delete a recipe. (Coming soon)
- As a user, I can browse with pagination
- As a user, I can filter and search for recipes by tags, name.

### Ingredients

- As a user, I can select ingredients by autocomplete feature.
- As a user, I can add new ingredients.
- As a user, I can remove ingredients from recipe.

### Tags

- As a user, I can select tags by autocomplete feature.
- As a user, I can add new tags.

### Planners

- As a user, I can add meals to desired days.
- As a user, I can remove a meal from its plan.
- As a user, I can see total of meals prepped.

### Insights

- As a user, I can get an insight of recipes by tags .
- As a user, I can get an insight of meal plan in the most recent week.

## API endpoints

### Auth APIs

```
/**
 * @route POST /auth/login
 * @description Log in with username and password
 * @body { email, password }
 * @access Public
 */
```

### User APIs

```
/**
 * @route POST /users
 * @description Register new user
 * @body { name, email, password }
 * @access Public
 */
```

```
/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
```

### Recipe APIs

```
/**
 * @route POST /recipes
 * @description Add a new recipe
 * @body { title, ingredientList, instructions, tagList, imageURL }
 * @access Login required
 */
```

```
/**
 * @route PUT /recipes/:id
 * @description Edit a recipe
 * @body { body }
 * @access Login required
 */
```

```
/**
 * @route GET /recipes/:id
 * @description View a recipe
 * @access Login required
 */
```

```
/**
 * @route GET /recipes/
 * @description View all recipes with filter
 * @access Login required
 */
```

```
/**
 * @route GET /recipes/:id/tags
 * @description Get tag list of a recipe
 * @access Login required
 */
```

```
/**
 * @route GET /recipes/:id/ingredients
 * @description Get ingredient of a recipe
 * @access Login required
 */
```

### Ingredient APIs

```
/**
 * @route POST /ingredients
 * @description Add a new ingredient
 * @body { ingredientName }
 * @access Login required
 */
```

```
/**
 * @route GET /ingredients
 * @description Get ingredient list
 * @body { ingredientName } ?
 * @access Login required
 */
```

### Tag APIs

```
/**
 * @route POST /tags
 * @description Add a new tag // IMPORT?
 * @body { tag }
 * @access Login required
 */
```

```
/**
 * @route GET /tags
 * @description Get all tags
 * @access Login required
 */
```

### Planner APIs

```
/**
 * @route POST /planners
 * @description Add a new meal plan
 * @body { mealList, date }
 * @access Login required
 */
```

```
/**
 * @route GET /planners
 * @description Get planner by date
 * @body { date }
 * @access Login required
 */
```

```
/**
 * @route GET /planners
 * @description Get planner by date
 * @body { date }
 * @access Login required
 */
```

### Insight APIs

```
/**
 * @route GET /insights/recipesbytag
 * @description Get recipe count by tags
 * @access Login required
 */
```

```
/**
 * @route GET /insights/mealsbydate
 * @description Get meal count by date
 * @access Login required
 */
```

## Entity Relationship Diagram

<img src="src/assets/MealBinder - Entity Relationship Diagram.jpg" style="width:800px;" />
