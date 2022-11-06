import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        console.log('test')
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(
                'https://console.firebase.google.com/project/ng-recipebook-app-415d9/database/ng-recipebook-app-415d9-default-rtdb/data/~2F/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log("testtesttesttesttesttesttesttesttesttesttesttest" + response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://console.firebase.google.com/project/ng-recipebook-app-415d9/database/ng-recipebook-app-415d9-default-rtdb/data/~2F/recipes.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }
}
