import { NgClass } from '@angular/common';
import { Component, ComponentRef, EventEmitter, Input, Output } from '@angular/core';
import { CardExchangeService } from '../card-exchange.service';

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

  constructor(private cardExchangeService: CardExchangeService) {
    this.cardId = -1;
    this.isActive = false;
  }

  public cardClicked(): void {
    this.isActive = true;
    this.cardExchangeService.cachedListenerFuns?.push(() => {
      this.isActive = false;
    })
    this.ev.emit(this.cardId);
  }
}
