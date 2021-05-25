import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetRecipes } from 'src/app/actions/recipe.action';
import { Recipe } from 'src/app/models/recipe';
import { RecipeState } from 'src/app/states/recipe.state';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  @Select(RecipeState.getRecipeList) recipeList$?: Observable<Recipe[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetRecipes());
  }

  getRecipeThumbnail(fileName: String) {
    return 'http://localhost:3001' + fileName;
  }
}
