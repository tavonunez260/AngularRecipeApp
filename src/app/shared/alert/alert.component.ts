import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input()
  message: string;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

}
