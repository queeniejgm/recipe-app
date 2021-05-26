import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetSelectedRecipe } from 'src/app/actions/recipe.action';
import { Recipe } from 'src/app/models/recipe';
import { RecipeState } from 'src/app/states/recipe.state';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  @Select(RecipeState.getSelectedRecipe) selectedRecipe$: Observable<Recipe>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  getRecipeThumbnail(fileName: String | undefined) {
    return fileName
      ? 'http://localhost:3001' + fileName
      : './assets/logo-white.webp';
  }

  backToList() {
    this.router.navigate(['/recipe']);
  }
}
