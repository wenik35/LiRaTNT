import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CardExchangeService } from './card-exchange.service';
import { NgClass } from '@angular/common';

export interface CardExchangeEvent {
  oldId: number,
  newId: number
}

@Component({
  selector: 'card-display',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-display.component.html',
  styleUrl: './card-display.component.scss'
})
export class CardDisplayComponent {
  @Output()
  public ev = new EventEmitter<number>();

  @Input()
  public cardId: number;
  public isActive: boolean;

  constructor(private cardExchangeService: CardExchangeService){
    this.cardId = -1;
    this.isActive = false;
  }

  public cardClicked(): void {
    this.isActive = !this.isActive;

    this.cardExchangeService.swapCard(this.cardId, (newId: number) => {
      this.cardId = newId;
      this.isActive = false;
      this.ev.emit(this.cardId);
    });
  }
}
