import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared/shared.module";

const routes: Routes = [
  {path: '', component: AuthComponent},
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
