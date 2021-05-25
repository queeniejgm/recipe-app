import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Recipe } from '../models/recipe';
import {
  AddRecipe,
  DeleteRecipe,
  GetRecipes,
  SetSelectedRecipe,
  UpdateRecipe,
} from '../actions/recipe.action';
import { RecipeService } from '../recipe.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface RecipeStateModel {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
}

@Injectable()
@State<RecipeStateModel>({
  name: 'Recipes',
  defaults: {
    recipes: [],
    selectedRecipe: null,
  },
})
export class RecipeState {
  constructor(private recipeService: RecipeService) {}

  @Selector()
  static getRecipeList(state: RecipeStateModel) {
    return state.recipes;
  }

  @Selector()
  static getSelectedRecipe(state: RecipeStateModel) {
    return state.selectedRecipe;
  }

  @Action(GetRecipes)
  getRecipes({ getState, setState }: StateContext<RecipeStateModel>) {
    return this.recipeService.fetchRecipes().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          recipes: result,
        });
      })
    );
  }
}
