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
   }

  createChatRoom(newChat: ChatRoom) {
    //this.http.send(`${this.url}/api/chatrooms`, {}, JSON.stringify(newChat));
    return this.http.post(`${this.url}/api/chatrooms`, newChat, {responseType: 'text'});
    //console.log("created from service");
  }

  getAllChatRooms(): Observable<ChatRoom[]>{
    return this.http.get<ChatRoom[]>(`${this.url}/api/chatrooms`);
  }
}
