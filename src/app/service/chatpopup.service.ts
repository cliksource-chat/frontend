import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ChatRoom } from '../model/chatroom.model';

@Injectable({
  providedIn: 'root'
})
export class ChatpopupService {

  private popupstatus = new Subject<boolean>();
  private messageView = new Subject<boolean>();
  private currentChat = new Subject<ChatRoom>();

  constructor() { }

  getPopUpStatus(): Observable<boolean> {
    return this.popupstatus.asObservable();
  }

  updatePopUpStatus(newStatus: boolean) {
    this.popupstatus.next(newStatus);
  }

  getMessageView(): Observable<boolean>{
    return this.messageView.asObservable();
  }

  updateMessageView(newView: boolean){
    this.messageView.next(newView);
  }

  getCurrentChat(): Observable<ChatRoom> {
    return this.currentChat.asObservable();
  }

  updateCurrentChat(newRoom: ChatRoom){
    this.currentChat.next(newRoom);
  }
}
