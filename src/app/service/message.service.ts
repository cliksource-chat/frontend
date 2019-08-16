import { Injectable } from '@angular/core';

import { Message } from '../model/message.model';

import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChatRoom } from '../model/chatroom.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string = "http://localhost:8090";
  socket: object = null;
  client: any = null;

  subscription: any = [];
  
  constructor(private http: HttpClient) {
    this.socket = SockJS(`${this.url}/chat`);
    this.client = Stomp.over(this.socket);
    this.client.connect({}, ()=> {console.log('finished web socket connection')}, (e) => {console.log(e)});
   } 

  connect(userId: string, chatId: string, callback: any) {
    //pass in topic to this function
    //to be implemented
    this.client.send(`${this.url}/app/chat/${chatId}/addUser`,
      {},
      JSON.stringify({sender: userId, type: 'JOIN'})
    );
    
    this.subscription.push(this.client.subscribe(`/channel/${chatId}`, (payload) => this.onSocketMessage(payload, callback) ))
  }

  onSocketMessage(payload: any, cb: any){
    let message: Message = JSON.parse(payload.body);
    console.log(message);
    if(message.message){
      cb(message);
    }
  }

  // gets the chats of the user by their id
  getChats(userid: string): Observable<ChatRoom[]>{
    return this.http.get<ChatRoom[]>(`${this.url}/api/chatrooms/userSpecific/${userid}`);
  }

  // get messages of chatroom by id
  getChatMessages(chatRoomID: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}/api/messages/byRoomId/${chatRoomID}`);
  }

  // get messages of specific chatroom
  getMessages(chatRoomID: string): Observable<Message[]>{
    //called when user clicks on a convo
    //replace id with topic (chat room id)
    return this.http.get<Message[]>(`${this.url}/api/messages/byRoomId/${chatRoomID}`);

  }

  // gets all the todos as an observable
  sendMessage(newMessage: Message) {
    this.client.send(`${this.url}/app/chat/${newMessage.chatRoom}/sendMessage`, {}, JSON.stringify(newMessage));
  }


}
