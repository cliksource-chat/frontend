import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatpopupService {

  private popupstatus = new Subject<boolean>();

  constructor() { }

  getPopUpStatus(): Observable<boolean> {
    return this.popupstatus.asObservable();
  }

  updatePopUpStatus(newStatus: boolean) {
    this.popupstatus.next(newStatus);
  }
}
