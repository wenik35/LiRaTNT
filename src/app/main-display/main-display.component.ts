import { AfterViewInit, Component, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CardDisplayComponent, CardExchangeEvent } from "../card-display/card-display.component";
import { NgClass, NgFor } from '@angular/common';
import { ActionButton } from './button';
import { CardExchangeService } from '../card-display/card-exchange.service';

@Component({
  selector: 'main-display',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CardDisplayComponent,
    NgFor,
    NgClass
  ],
  templateUrl: './main-display.component.html',
  styleUrl: './main-display.component.scss'
})
export class MainDisplayComponent implements AfterViewInit {
  public buttons: ActionButton[] = [];

  constructor(private cardService: CardExchangeService) { }

  @ViewChild(CardDisplayComponent)
  mainCardDisplay: CardDisplayComponent | undefined;

  ngAfterViewInit(){
    this.buttons.push(
      {name: "Neue Karte ziehen", active: true, action: () => {
        const newCardId = this.cardService.drawCard();
        this.mainCardDisplay!.cardId = newCardId;
        this.cardChanged(newCardId);
      }},
      {name: "Karte wegwerfen", active: false, action: () => {this.mainCardDisplay!.cardId = -1; this.cardChanged(-1);}},
    );
  }

  public cardChanged(newId: number): void{
    if (newId == -1) {
      this.buttons[0].active = true;
      this.buttons[1].active = false;
    } else {
      this.buttons[0].active = false;
      this.buttons[1].active = true;
    }
  }
}
