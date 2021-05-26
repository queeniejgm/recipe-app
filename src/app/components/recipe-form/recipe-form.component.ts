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
import {
  AddRecipe,
  SetSelectedRecipe,
  UpdateRecipe,
} from 'src/app/actions/recipe.action';
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
  editRecipe = false;
  ingredientForm = [];
  recipeId: String;
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
      this.selectedRecipe.subscribe((recipe) => {
        if (recipe) {
          this.recipeId = recipe.uuid;
          this.recipeForm.patchValue({
            ...recipe,
          });

          recipe.ingredients.forEach((item) => {
            (<FormArray>this.recipeForm.controls.ingredients).push(
              this.fb.group(item)
            );
          });

          recipe.directions.forEach((item) => {
            (<FormArray>this.recipeForm.controls.directions).push(
              this.fb.group(item)
            );
          });

          this.editRecipe = true;
        } else {
          this.editRecipe = false;
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
      ingredients: this.fb.array([
        this.fb.group({ name: '', amount: 0, measurement: '' }),
      ]),
      directions: this.fb.array([
        this.fb.group({ instructions: '', optional: false }),
      ]),
      images: this.fb.group({
        full: null,
        medium: null,
        small: null,
      }),
      postDate: [new Date()],
      editDate: [new Date()],
    });
  }

  get ingredientsFormGroups() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredientField() {
    let newIngredientGroup: any = [];

    newIngredientGroup['name'] = new FormControl('', Validators.required);
    newIngredientGroup['amount'] = new FormControl(0, Validators.required);
    newIngredientGroup['measurement'] = new FormControl(
      '',
      Validators.required
    );

    (<FormArray>this.recipeForm.controls.ingredients).push(
      this.fb.group(newIngredientGroup)
    );
  }

  get directionsFormGroups() {
    return this.recipeForm.get('directions') as FormArray;
  }

  addDirectionsField() {
    let newDirectionGroup: any = [];

    newDirectionGroup['instructions'] = new FormControl(
      '',
      Validators.required
    );
    newDirectionGroup['optional'] = new FormControl(false, Validators.required);

    (<FormArray>this.recipeForm.controls.directions).push(
      this.fb.group(newDirectionGroup)
    );
  }

  onSubmit() {
    if (this.editRecipe) {
      this.formSubscription.add(
        this.store
          .dispatch(new UpdateRecipe(this.recipeForm.value, this.recipeId))
          .subscribe(() => {
            this.router.navigate(['/recipe']);
          })
      );
    } else {
      console.log('!!! formVal', this.recipeForm.value);
      this.formSubscription.add(
        (this.formSubscription = this.store
          .dispatch(new AddRecipe(this.recipeForm.value))
          .subscribe(() => {
            this.router.navigate(['/recipe']);
          }))
      );
    }
  }

  backToList() {
    this.router.navigate(['/recipe']);
  }
}
