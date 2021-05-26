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

  @Action(AddRecipe)
  addRecipe(
    { getState, patchState }: StateContext<RecipeStateModel>,
    { payload }: AddRecipe
  ) {
    return this.recipeService.addRecipe(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          recipes: [...state.recipes, result],
        });
      })
    );
  }

  @Action(SetSelectedRecipe)
  setSelectedRecipeId(
    { getState, setState }: StateContext<RecipeStateModel>,
    { payload }: SetSelectedRecipe
  ) {
    const state = getState();
    setState({
      ...state,
      selectedRecipe: payload,
    });
  }

  @Action(UpdateRecipe)
  updateRecipe(
    { getState, setState }: StateContext<RecipeStateModel>,
    { payload, id }: UpdateRecipe
  ) {
    return this.recipeService.updateRecipe(payload, id).pipe(
      tap((result) => {
        const state = getState();
        const RecipeList = [...state.recipes];
        const RecipeIndex = RecipeList.findIndex((item) => item.uuid === id);
        RecipeList[RecipeIndex] = result;
        setState({
          ...state,
          recipes: RecipeList,
        });
      })
    );
  }

  @Action(DeleteRecipe)
  deleteRecipe(
    { getState, setState }: StateContext<RecipeStateModel>,
    { id }: DeleteRecipe
  ) {
    return this.recipeService.deleteRecipe(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.recipes.filter((item) => item.uuid !== id);
        setState({
          ...state,
          recipes: filteredArray,
        });
      })
    );
  }
}
