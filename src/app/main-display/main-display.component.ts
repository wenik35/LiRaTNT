import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { CardExchangeService } from '../card-collection/card-exchange.service';
import { CardCollectionComponent } from "../card-collection/card-collection.component";

interface ActionButton{
  label: string;
  action: CallableFunction;
}

@Component({
  selector: 'main-display',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgFor,
    NgClass,
    CardCollectionComponent
],
  templateUrl: './main-display.component.html',
  styleUrl: './main-display.component.scss'
})
export class MainDisplayComponent {
  private buttons = {
    newCard: {
      label: "Neue Karte ziehen",
      action: () => {
        const newCardId = this.cardExchangeService.drawCard();
        this.mainCardDisplay!.cardIds[0] = newCardId;
        this.cardChanged([newCardId]);
      }
    },
    trash: {
      label: "Karte wegwerfen",
      action: () => {this.mainCardDisplay!.cardIds[0] = -1; this.cardChanged([-1]);}
    }
  }

  public activeButtons: ActionButton[] = [this.buttons.newCard];

  constructor(private cardExchangeService: CardExchangeService) { }

  @ViewChild(CardCollectionComponent)
  mainCardDisplay: CardCollectionComponent | undefined;

  public cardChanged(ids: number[]): void{
    if (ids[0] == -1) {
      this.activeButtons = [this.buttons.newCard];
    } else {
      this.activeButtons = [this.buttons.trash];
    }

    this.cardExchangeService.cachedListenerFuns?.push(() => {
      this.activeButtons = [this.buttons.newCard];
    })
  }
}
