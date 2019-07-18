import { Injectable } from '@angular/core';

import { Message } from '../model/message.model';

import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string = "http://localhost:8090";
  socket: object = null;
  client: any = null;

  constructor(private http: HttpClient) {
    this.socket = SockJS(`${this.url}/chat`);
    this.client = Stomp.over(this.socket);
    this.client.connect({}, ()=> {console.log('connected')}, (e) => {console.log(e)});
   } 

  connect() {
    this.client.send(`${this.url}/app/chat/public/addUser`,
    {},
    JSON.stringify({sender: "dev", type: 'JOIN'})
  );
    
  }

  getConversations(){

  }

  getMessages(): Observable<Message[]>{
    //called when user clicks on a convo
    return this.http.get<Message[]>(`${this.url}/api/messages/byRoomId/5d2f747ed27e122d4cfb1941`);

  }



  // gets all the todos as an observable
  sendMessage(newMessage: Message) {
    console.log('sending message: ' + newMessage.message);
    console.log("message object:\n------", newMessage);
    this.client.send(`${this.url}/app/chat/public/sendMessage`, {}, JSON.stringify(newMessage));
  }


}
