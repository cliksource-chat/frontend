import { Injectable } from '@angular/core';

import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string = "http://localhost:8090";

  constructor() { } 

  connect() {
    
  }

  // gets all the todos as an observable
  sendMessage(message: Message) {
    console.log('sending message: ' + message.content);
  }


}
