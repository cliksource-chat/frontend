import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatRoom } from '../model/chatroom.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  url: string = "http://localhost:8090";
  socket: object = null;
  client: any = null;

  constructor(private http: HttpClient) {
    this.socket = SockJS(`${this.url}/chat`);
    this.client = Stomp.over(this.socket);
    this.client.connect({}, ()=> {console.log('connected')}, (e) => {console.log(e)});
   }

  createChatRoom(newChat: ChatRoom) {
    this.client.send(`${this.url}/api/chatrooms`, {}, JSON.stringify(newChat));
  }

  getAllChatRooms(): Observable<ChatRoom[]>{
    return this.http.get<ChatRoom[]>(`${this.url}/api/chatrooms`);
  }
}
