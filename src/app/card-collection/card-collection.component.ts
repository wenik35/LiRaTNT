import { Component, EventEmitter, Output } from '@angular/core';
import { CardExchangeService } from './card-exchange.service';
import { CardContainerComponent } from './card-container/card-container.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'card-collection',
  standalone: true,
  imports: [CardContainerComponent, NgFor],
  templateUrl: './card-collection.component.html',
  styleUrl: './card-collection.component.scss'
})
export class CardCollectionComponent {
  @Output()
  public ev = new EventEmitter<number[]>();

  constructor(private cardExchangeService: CardExchangeService){

  }

  public cardIds: number[] = [-1];
  private cachedId?: number;

  public cardChanged(id: number) {
    if (this.cachedId && this.cachedId != id) {
      this.replaceCardId(this.cachedId!, -2);
      this.replaceCardId(id, this.cachedId!);
      this.replaceCardId(-2, id);
      this.cachedId = undefined;
    } else {
      this.cardExchangeService.swapCard(id, (newId: number) => {
        this.cachedId = undefined;
        this.replaceCardId(this.cachedId!, id);
      });
    };

    let emptyIndex = this.cardIds.findIndex((id) => id == -1);
    if (emptyIndex == -1) {this.cardIds.push(-1);}

    emptyIndex = this.cardIds.findIndex((id) => id == -1);
    if (emptyIndex < this.cardIds.length-1 && this.cardIds.length > 1) {this.cardIds.splice(emptyIndex, 1);}
  }

  private replaceCardId(oldId: number, newId: number): void {
    const replaceIndex = this.cardIds.findIndex((id) => id == oldId);
    this.cardIds[replaceIndex] = newId;
  }
}