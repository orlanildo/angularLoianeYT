import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendValueService {

  private issuer$ = new Subject<string>();

  emitirValor(valor: string) {
    this.issuer$.next(valor);
  }

  getValor() {
    return this.issuer$.asObservable();
  }

}