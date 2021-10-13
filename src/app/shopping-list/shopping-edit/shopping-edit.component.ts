import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient";
import {Subscription} from "rxjs";
import {ShoppingListService} from "../shopping-list.service";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shoppingListForm: NgForm;
  susbcription: Subscription;
  editedItemIndex: number;
  editMode = false;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcription = this.slService.startedEditing.subscribe((i: number) => {
      this.editMode = true;
      this.editedItemIndex = i;
      this.editedItem = this.slService.getIngredient(i);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient: Ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //this.slService.updateIngredient(this.editedItemIndex, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient}));
    } else {
      //this.slService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient))
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }
}
