import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { User } from '../model/user.model';
import { ChatRoom } from '../model/chatroom.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message = 
  {
    "id": "",
    "sender": null,
    "content": "",
    "timeStamp": null,
    "chatRoom": null
  }

  messageList: Message[] =[];
  closed = true;
  static idCount: number = 1000;

  manager: User = {id: "1", firstName: "hello", lastName: "world", type: "manager"};
  candidate: User = {id: "2", firstName: "goodbye", lastName: "earth", type: "candidate"};
  aChatRoom: ChatRoom = {id: "1", created: "2019-07-17T13:14:58+00:00", user1: this.manager, 
                        user2: this.candidate};

  constructor(private service: MessageService) { }

  ngOnInit() {
  }

  minimize() {
    this.closed = !this.closed;
  }

  sendMessage(messageForm: any) {
    let newMessage: any = {id: ChatComponent.idCount.toString(), sender: this.manager, 
                          content: messageForm.content.trim(), timeStamp: new Date(),
                          chatRoom: this.aChatRoom};
    
    // will send message if not empty
    if(newMessage.content == "" || newMessage == null) {
      console.log("Empty message, not sent");
    }
    else {
      console.log("ID: " + newMessage.id + "\tFrom: " + newMessage.sender.firstName + " " + 
                  newMessage.sender.lastName + "\tMessage: " + newMessage.content + "\tTimeStamp: " + 
                  newMessage.timeStamp + "\tChatRoom ID: " + newMessage.chatRoom.id);

      // clear message text box
      this.message.content = '';

      // display message on chat
      this.messageList.push(newMessage);

      // scroll down after message sent
      // TODO: figure out later
      
      // send the message to backend with service
      this.service.sendMessage(newMessage);

    }

  }

}
