import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

const routes: Routes = [
  {
    path: 'recipe',
    component: RecipeListComponent,
  },
  { path: 'recipe-form', component: RecipeFormComponent },
  { path: 'recipe-details', component: RecipeDetailsComponent },
  { path: '**', redirectTo: 'recipe' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
