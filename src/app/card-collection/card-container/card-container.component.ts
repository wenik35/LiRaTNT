import { NgClass } from '@angular/common';
import { Component, ComponentRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'card-container',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-container.component.html',
  styleUrl: './card-container.component.scss'
})
export class CardContainerComponent {
  @Output()
  public ev = new EventEmitter<number>();

  @Input()
  public cardId: number;
  public isActive: boolean;

  constructor() {
    this.cardId = -1;
    this.isActive = false;
  }

  public cardClicked(): void {
    this.isActive = !this.isActive;
    this.ev.emit(this.cardId);
  }
}
