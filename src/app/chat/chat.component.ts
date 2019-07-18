import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Message } from '../model/message.model';
import { User } from '../model/user.model';
import { ChatRoom } from '../model/chatroom.model';
import { LoginService } from '../service/login.service';

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
    "sender": "",
    "message": "",
    "chatRoom": "",
    "timeStamp": null
  }

  messageList: Message[] = null;
  closed = true;
  singleMessageView = true;
 

  candidate0: User =  {
    id: "5d2f6765d27e1243a0cc329a",
    firstName: "Tom",
    lastName: "Riddle",
    type: "Candidate"
    };

  manager: User = {
    id: "5d2f6773d27e1243a0cc329b",
    firstName: "Harry",
    lastName: "Potter",
    type: "Employer"
    }
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

  mainChat = '5d2f747ed27e122d4cfb1941';

  currentUser: string;
                      

  constructor(private messageService: MessageService, private loginService: LoginService) { }

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUser();
    console.log("Current User ID: " + this.currentUser);
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
    this.messageService.connect();
    
    this.messageService.getMessages()
    .subscribe(
      (data: Message[]) => {
        this.messageList = data;
      }, (error: any) => console.log(error), () => console.log('fetched!')
    );

    console.log(this.messageList);
  }

  sendMessage(messageForm: any) {
    let newMessage: any = {id: '0', sender: this.manager.id, 
                          message : messageForm.message.trim(),
                          chatRoom: this.mainChat, timeStamp: new Date()};
    
    // will send message if not empty
    if(newMessage.message == "" || newMessage.message == null) {
      console.log("Empty message, not sent");
    }
    else {
      console.log("ID: " + newMessage.id + "\tFrom: " + newMessage.sender + " "
       + "\tMessage: " + newMessage.message + "\tChatRoom ID: " + newMessage.chatRoom,
       + "\tTime Stamp: " + newMessage.timeStamp);

      // clear message text box
      this.message.message = '';

      // display message on chat
      this.messageList.push(newMessage);

      // scroll down after message sent
      // TODO: figure out later
      
      // send the message to backend with service
      this.messageService.sendMessage(newMessage);

    }

  }

  openMessage() {
    document.getElementById("myMessage").style.display = "block";
  }
  
  closeMessage() {
    document.getElementById("myMessage").style.display = "none";
  }

}
