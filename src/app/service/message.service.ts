import { Injectable } from '@angular/core';

import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // end-point url
  //baseURL: string = "http://localhost:8080/api";

  constructor() { } 

  // gets all the todos as an observable
  sendMessage(message: Message) {
    console.log('sending message: ' + message.content);
  }


}
