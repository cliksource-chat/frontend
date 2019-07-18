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
  public searchText: string;

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
  singleMessageView = true;
  static idCount: number = 1000;

  manager: User = {id: "1", firstName: "Judy", lastName: "Pringle", type: "manager"};
  candidate1: User = {id: "2", firstName: "Mark", lastName: "Vice", type: "candidate"};
  candidate2: User = {id: "2", firstName: "Tiffany", lastName: "Gordon", type: "candidate"};
  candidate3: User = {id: "2", firstName: "Mark", lastName: "Jacobs", type: "candidate"};
  candidate4: User = {id: "2", firstName: "Nia", lastName: "Long", type: "candidate"};
  candidate5: User = {id: "2", firstName: "Stacy", lastName: "Adams", type: "candidate"};
  
  chatList: ChatRoom[] = 
  [
    {id: "1", created: new Date, user1: this.manager, user2: this.candidate1},
    {id: "2", created: new Date, user1: this.manager, user2: this.candidate2},
    {id: "3", created: new Date, user1: this.manager, user2: this.candidate3},
    {id: "4", created: new Date, user1: this.manager, user2: this.candidate4},
    {id: "5", created: new Date, user1: this.manager, user2: this.candidate5}
  ];

  currentChat: ChatRoom;
                      

  constructor(private service: MessageService) { }

  ngOnInit() {
  }

  minimize() {
    this.closed = !this.closed;
  }

  changeView() {
    this.singleMessageView = !this.singleMessageView;
  }

  selectChat(selectedChat: ChatRoom) {
    this.currentChat = selectedChat;
    this.changeView();
  }

  sendMessage(messageForm: any) {
    let newMessage: any = {id: ChatComponent.idCount.toString(), sender: this.manager, 
                          content: messageForm.content.trim(), timeStamp: new Date(),
                          chatRoom: this.currentChat};
    
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

  openMessage() {
    document.getElementById("myMessage").style.display = "block";
  }
  
  closeMessage() {
    document.getElementById("myMessage").style.display = "none";
  }

}
