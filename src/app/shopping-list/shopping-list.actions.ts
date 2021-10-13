import {Action, createAction, props} from '@ngrx/store';
import {Ingredient} from "../shared/ingredient";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient;

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: {index: number, ingredient: Ingredient}) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {
  }
}

export const loadShoppingLists = createAction(
  '[ShoppingList] Load ShoppingLists'
);

export const loadShoppingListsSuccess = createAction(
  '[ShoppingList] Load ShoppingLists Success',
  props<{ data: any }>()
);

export const loadShoppingListsFailure = createAction(
  '[ShoppingList] Load ShoppingLists Failure',
  props<{ error: any }>()
);
