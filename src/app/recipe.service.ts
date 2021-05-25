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
}
