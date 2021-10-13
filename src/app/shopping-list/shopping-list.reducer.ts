import { createReducer } from '@ngrx/store';
import {Ingredient} from "../shared/ingredient";
import * as ShoppingListActions from "./shopping-list.actions";
import {act} from "@ngrx/effects";

export const shoppingListFeatureKey = 'shoppingList';

export interface State {
  ingredients: any;

}

export const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ]
};


export const reducer = createReducer(
  initialState,
);

// @ts-ignore
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients
      }

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== action.payload;
        })
      }

    default:
      return state;
  }
}

