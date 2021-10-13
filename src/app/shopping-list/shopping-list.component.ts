import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {Observable, Subscription} from "rxjs";
import {ShoppingListService} from "./shopping-list.service";
import {LoggingService} from "../logging.service";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[] }>;
  //private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService,
              private loggingService: LoggingService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
              ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    /*this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
    this.loggingService.printLog("Hello from ShoppingListComponent");*/
  }

  ngOnDestroy(): void {
    //this.igChangeSub.unsubscribe();
  }

  onEditItem(i: number) {
    this.slService.startedEditing.next(i);
  }

}
