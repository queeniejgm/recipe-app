import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteRecipe,
  GetRecipes,
  SetSelectedRecipe,
} from 'src/app/actions/recipe.action';
import { Recipe } from 'src/app/models/recipe';
import { RecipeState } from 'src/app/states/recipe.state';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  @Select(RecipeState.getRecipeList) recipeList$?: Observable<Recipe[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new GetRecipes());
  }

  getRecipeThumbnail(fileName: String) {
    return fileName
      ? 'http://localhost:3001' + fileName
      : './assets/logo-white.webp';
  }

  editRecipe(recipe: Recipe) {
    this.store.dispatch(new SetSelectedRecipe(recipe));
    this.router.navigate(['/create-recipe']);
  }

  viewRecipe(recipe: Recipe) {
    this.store.dispatch(new SetSelectedRecipe(recipe));
    this.router.navigate(['/recipe-details']);
  }

  addRecipe() {
    this.router.navigate(['/create-recipe']);
  }

  deleteRecipe(id: String) {
    this.store.dispatch(new DeleteRecipe(id));
  }
}
