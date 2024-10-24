import { Injectable } from '@angular/core';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardExchangeService {
  private cachedCardId?: number;
  private cachedCallbackFun?: CallableFunction;
  private availableCards: number[] = [];
  public cachedListenerFuns?: CallableFunction[] = [];

  constructor() {
    for (let i = 0; i < 120; i++){
      this.availableCards.push(i);
    }
  }

  public swapCard(cardId: number, callbackFun: CallableFunction){
    if (this.cachedCallbackFun){
      this.cachedCallbackFun(cardId);
      callbackFun(this.cachedCardId);
      this.cachedCallbackFun = undefined;

      this.cachedListenerFuns!.forEach(func => {
        func();
      });
      this.cachedListenerFuns = [];
    } else if (cardId == this.cachedCardId && this.cachedCallbackFun){
      this.cachedCallbackFun = undefined;
    } else {
      this.cachedCardId = cardId;
      this.cachedCallbackFun = callbackFun;
    }
  }

  public drawCard(): number{
    const randIndex = Math.floor(Math.random() * this.availableCards?.length);
    const cardId = this.availableCards[randIndex];
    this.availableCards.splice(randIndex, 1);
    return cardId;
  }

  public deleteCache(){
    this.cachedCallbackFun = undefined;
    this.cachedCardId = undefined;
  }
}
