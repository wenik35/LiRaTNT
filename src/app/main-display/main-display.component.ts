import { AfterViewInit, Component, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { ActionButton } from './button';
import { CardExchangeService } from '../card-collection/card-exchange.service';
import { CardCollectionComponent } from "../card-collection/card-collection.component";

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
export class MainDisplayComponent implements AfterViewInit {
  public buttons: ActionButton[] = [];

  constructor(private cardService: CardExchangeService) { }

  @ViewChild(CardCollectionComponent)
  mainCardDisplay: CardCollectionComponent | undefined;

  ngAfterViewInit(){
    this.buttons.push(
      {name: "Neue Karte ziehen", active: true, action: () => {
        const newCardId = this.cardService.drawCard();
        this.mainCardDisplay!.cardIds[0] = newCardId;
        this.cardChanged([newCardId]);
      }},
      {name: "Karte wegwerfen", active: false, action: () => {this.mainCardDisplay!.cardIds[0] = -1; this.cardChanged([-1]);}},
    );
  }

  public cardChanged(ids: number[]): void{
    if (ids[0] == -1) {
      this.buttons[0].active = true;
      this.buttons[1].active = false;
    } else {
      this.buttons[0].active = false;
      this.buttons[1].active = true;
    }
  }
}
