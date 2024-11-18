import { ApplicationRef, Component, Inject, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT, NgIf } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { MainDisplayComponent } from "./main-display/main-display.component";
import { CardCollectionComponent } from './card-collection/card-collection.component';
import { CardExchangeService } from './card-collection/card-exchange.service';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CardCollectionComponent, UserListComponent, MainDisplayComponent],
  providers: [CardExchangeService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liratnt';

  constructor(){
  }
  
}
