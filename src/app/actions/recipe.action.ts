import { Recipe } from '../models/recipe';

export class AddRecipe {
  static readonly type = '[Recipe] Add';

  constructor(public payload: Recipe) {}
}

export class GetRecipes {
  static readonly type = '[Recipe] Get';
}

export class UpdateRecipe {
  static readonly type = '[Recipe] Update';

  constructor(public payload: Recipe, public id: number) {}
}

export class DeleteRecipe {
  static readonly type = '[Recipe] Delete';

  constructor(public id: number) {}
}

export class SetSelectedRecipe {
  static readonly type = '[Recipe] Set';

  constructor(public payload: Recipe) {}
}
