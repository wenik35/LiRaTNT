import { ApplicationRef, Component, Inject, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CardDisplayComponent } from './card-display/card-display.component';
import { UserListComponent } from './user-list/user-list.component';
import { MainDisplayComponent } from "./main-display/main-display.component";
import { CardExchangeService } from './card-display/card-exchange.service';
import { CardCollectionComponent } from "./card-display/card-collection/card-collection.component";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterOutlet, CardDisplayComponent, UserListComponent, MainDisplayComponent, CardCollectionComponent],
  providers: [CardExchangeService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liratnt';

  constructor(){
  }


}
