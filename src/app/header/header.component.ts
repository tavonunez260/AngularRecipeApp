import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "../recipes/recipe.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorage: DataStorageService, private recipeService: RecipeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true
    })
  }

  ngOnDestroy(): void {
  }

  onSaveData() {
    this.dataStorage.storeRecipes().subscribe(response => {
      console.log(response);
    });
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.authService.logout();
  }
}
