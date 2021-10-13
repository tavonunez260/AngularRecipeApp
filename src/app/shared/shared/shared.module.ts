import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from "../alert/alert.component";
import {PlaceholderDirective} from "../placeholder.directive";
import {DropdownDirective} from "../dropdown.directive";
import {SpinnerComponent} from "../spinner/spinner.component";
import {LoggingService} from "../../logging.service";

@NgModule({
  declarations: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    SpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  providers: [LoggingService]
})
export class SharedModule { }
