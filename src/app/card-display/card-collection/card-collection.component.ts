import { Component, QueryList, ViewChildren } from '@angular/core';
import { CardDisplayComponent } from '../card-display.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'card-collection',
  standalone: true,
  imports: [CardDisplayComponent, NgFor],
  templateUrl: './card-collection.component.html',
  styleUrl: './card-collection.component.scss'
})
export class CardCollectionComponent {
  public cardIds: number[] = [-1];

  @ViewChildren(CardDisplayComponent)
  public displays?: QueryList<CardDisplayComponent>

  public cardChanged() {
    const emptyIndex = this.displays!.toArray().findIndex((display) => display.cardId == -1);
    if (emptyIndex == -1) {this.cardIds.push(-1);}
    else if (emptyIndex < this.cardIds.length-1 && this.cardIds.length > 1) {
      this.cardIds.splice(emptyIndex, 1);
    }
  }
}
