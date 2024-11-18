import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
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
    NgIf,
    CardCollectionComponent
],
  templateUrl: './main-display.component.html',
  styleUrl: './main-display.component.scss'
})
export class MainDisplayComponent {
  private buttons = {
    newCard:
      {
        label: "Neue Karte ziehen",
        action: () => {
          const newCardId = this.cardExchangeService.drawCard();
          this.mainCardDisplay!.cardIds[0] = newCardId;
          this.cardChanged([newCardId]);
        }
      },
    trash:
      {
        label: "Karte wegwerfen",
        action: () => {
          this.cardExchangeService.trashCard(this.mainCardDisplay!.cardIds[0]);
          this.mainCardDisplay!.cardIds[0] = -1;
          this.cardChanged([-1]);
        }
      }
  }

  public activeButtons: ActionButton[] = [this.buttons.newCard];

  constructor(private cardExchangeService: CardExchangeService) { }

  @ViewChild(CardCollectionComponent)
  mainCardDisplay: CardCollectionComponent | undefined;

  public cardChanged(ids: number[]): void{
    switch (ids[0]){
      case -1:
        this.activeButtons = [this.buttons.newCard];
        break;
      case 2:
        //TODO: verdeckte karte implementieren
        this.activeButtons = [this.buttons.trash];
        break;
      case 10 | 11:
        //TODO: spielrichtung umkehren
        this.activeButtons = [this.buttons.trash];
        break;
      case 12:
        //TODO: karte rotieren
        this.activeButtons = [this.buttons.trash];
        break;
      case 24 | 25 | 26 | 37 | 38 | 39:
        //TODO: reihenfolge tauschen
        this.activeButtons = [this.buttons.trash];
        break;
      case 48 | 49:
        //TODO: ablagestapel zurück in nachziehstapel
        this.activeButtons = [this.buttons.trash];
        break;
      case 66:
        this.activeButtons = [this.buttons.trash, {
          label: "Zurück in den Nachziehstapel", 
          action: () => {
            this.cardExchangeService.backToDrawStack(this.mainCardDisplay!.cardIds[0]);
            this.mainCardDisplay!.cardIds[0] = -1;
            this.cardChanged([-1]);
          }}];
        break;
      default:
        this.activeButtons = [this.buttons.trash];
        break;
    }

    this.cardExchangeService.cachedListenerFuns?.push(() => {
      this.activeButtons = [this.buttons.newCard];
    })
  }
}
