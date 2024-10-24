import { DOCUMENT, NgFor } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Player } from './player';
import { CardCollectionComponent } from '../card-collection/card-collection.component';

@Component({
  selector: 'user-list',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgFor,
    CardCollectionComponent
],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private addUserInput: HTMLInputElement;
  public players: Player[];
  private highestPlayerId: number;

  constructor(@Inject(DOCUMENT) document: Document){
    this.highestPlayerId = -1;
    this.players = [{id: this.highestPlayerId++, name: "test"}];
    this.addUserInput = (document.getElementById("add-user-input") as HTMLInputElement);
  }

  public addUser(): void {
    const userName =  this.addUserInput.value;

    if(userName){
      this.addUserInput.textContent = "";
  
      this.players.push({id: this.highestPlayerId++, name: userName});
    }
  }
  public deletePlayer(id: number){
    const deleteIndex = this.players.findIndex((player) => player.id = id);
    this.players.splice(deleteIndex, 1);
  }
}
