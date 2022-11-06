import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Spaghetti Bolognese',
            'The Bolognese Sauce is rich, thick and has beautiful depth of flavour.',
            'https://hips.hearstapps.com/hmg-prod/images/delish-bolognese-horizontal-1-1540572556.jpg',
            [
                new Ingredient('Beef Mince', 500),
                new Ingredient('Crushed Tomatoes', 800),
                new Ingredient('Garlic Clove', 2),
                new Ingredient('Dried Bay Leaves', 2),
                new Ingredient('Beef Bouillon Cubes', 2),
                new Ingredient('Dry Red Wine', 125),
            ]
        ),
        new Recipe(
            'Choco Protein Porridge',
            'Tasty and quick protein rich breakfast. ',
            'https://www.fourchette-et-bikini.fr/sites/default/files/styles/article_960x540/public/migration-images/62173b165f9e573f565092bfb6e08903.webp?itok=G5iN0D_A',
            [
                new Ingredient('Rolled Oats', 50),
                new Ingredient('Milk', 250),
                new Ingredient('Choco Protein Powder', 30),
            ]
        ), 
        new Recipe(
            'Vegan Ceasar Salad',
            'This vegan Caesar salad tastes even better than the original! ',
            'https://www.acouplecooks.com/wp-content/uploads/2021/03/Vegan-Caesar-Salad-007.jpg',
            [
                new Ingredient('Romaine Hearts', 2),
                new Ingredient('Tuscan Kale', 200),
                new Ingredient('Avocado', 1),
                new Ingredient('Croutons', 60),
            ]
        )
    ];
    // private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
