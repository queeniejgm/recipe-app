import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetSelectedRecipe, UpdateRecipe } from 'src/app/actions/recipe.action';
import { Recipe } from 'src/app/models/recipe';
import { RecipeState } from 'src/app/states/recipe.state';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  @Select(RecipeState.getSelectedRecipe) selectedRecipe: Observable<Recipe>;
  recipeForm: FormGroup;
  editTodo = false;
  ingredientForm = [];
  private formSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.formSubscription.add(
      this.selectedRecipe.subscribe((todo) => {
        if (todo) {
          this.recipeForm.patchValue({
            // id: todo.id,
            // userId: todo.userId,
            // title: todo.title,
          });
          this.editTodo = true;
        } else {
          this.editTodo = false;
        }
      })
    );
  }

  createForm() {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      servings: ['', Validators.required],
      prepTime: ['', Validators.required],
      cookTime: ['', Validators.required],
      ingredients: this.fb.array([{ name: '', amount: 0, measurement: '' }]),
      directions: this.fb.group({
        instructions: '',
        optional: false,
      }),
    });
  }

  get ingredientsFormGroups() {
    return this.recipeForm?.controls[0]?.get('ingredients')?.value;
  }

  addIngredientField() {}

  onSubmit() {
    // if (this.editTodo) {
    //   this.formSubscription.add(
    //     this.store
    //       .dispatch(
    //         new UpdateRecipe(this.recipeForm.value, this.recipeForm.value.id)
    //       )
    //       .subscribe(() => {
    //         this.clearForm();
    //       })
    //   );
    // } else {
    //   this.formSubscription.add(
    //     (this.formSubscription = this.store
    //       .dispatch(new AddTodo(this.recipeForm.value))
    //       .subscribe(() => {
    //         this.clearForm();
    //       }))
    //   );
    // }
  }

  clearForm() {
    this.recipeForm.reset();
  }
}
