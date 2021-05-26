import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  fetchRecipes() {
    return this.http.get<Recipe[]>('http://localhost:3001/recipes');
  }

  deleteRecipe(id: String) {
    return this.http.delete('http://localhost:3001/recipes/' + id);
  }

  addRecipe(payload: Recipe) {
    return this.http.post<Recipe>('http://localhost:3001/recipes', payload);
  }

  updateRecipe(payload: Recipe, id: String) {
    return this.http.put<Recipe>(
      'http://localhost:3001/recipes/' + id,
      payload
    );
  }
}
