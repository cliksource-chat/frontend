import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Message } from '../model/message.model';
import { User } from '../model/user.model';
import { ChatRoom } from '../model/chatroom.model';
import { LoginService } from '../service/login.service';
import { ChatpopupService } from '../service/chatpopup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scroller', {static: false}) private feedContainer: ElementRef;

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
  
  closed: any;
  singleMessageView = true;

  chatList: ChatRoom[];

  notifs:any = {};

  currentChat: ChatRoom;

  currentUser: string;

  userIsEmployer: boolean;

  subscription: Subscription;
                      

  constructor(private messageService: MessageService, private loginService: LoginService, 
    private popupService: ChatpopupService) {

    // sets scroll to bottom at creation
    this.getAllChats(); 
    
    if(loginService.getCurrentUserType().toLowerCase() == "employer") {
      this.userIsEmployer = true;
    } 
    else { 
      this.userIsEmployer = false; 
    }

    // scrolls chat to bottom on start
    this.scrollToBottom();

    // subscribe to popup for chat
    this.subscription = this.popupService.getPopUpStatus()
      .subscribe(status => { 
        if(closed)
          this.getAllChats();
        this.closed = status; 
      } );
    // set popup to closed
    this.popupService.updatePopUpStatus(true);

   }

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUserID();
    console.log("Current User ID: " + this.currentUser);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  minimize() {
    // if (closed) {
    //   this.popupService.updatePopUpStatus(false);
    // } else {
    //   this.popupService.updatePopUpStatus(true);
    // }
    if(closed) {
      // refresh chats
      this.getAllChats();
    }

    this.closed = !this.closed;
  }

  changeView() {
    this.singleMessageView = !this.singleMessageView;
  }

  scrollToBottom(): void {
    try {
      this.feedContainer.nativeElement.scrollTop =
        this.feedContainer.nativeElement.scrollHeight;
    } catch(err) {} // keep try catch or else will get error when running code
  }

  getAllChats() {
    this.messageService.getChats(this.loginService.getCurrentUserID())
      .subscribe (
        (data: ChatRoom[]) => {
          this.chatList = data;
        },
        (error: any) => console.log(error),
        async () => {
          //establish connection to all chats here
          //force program to wait 1 second to allow sockets to finish connection process
          await new Promise(resolve => setTimeout(resolve, 1000));
         
          this.chatList.forEach(room => this.messageService.connect(this.currentUser, room.id, this.listen(this.currentUser)))
        }
      );
  }

  selectChat(selectedChat: ChatRoom) {
    this.currentChat = selectedChat;
    this.changeView();

    //clear notifications for this channel (if any)
    this.notifs[selectedChat.id] = 0;
    
    this.messageService.getMessages(this.currentChat.id)
    .subscribe(
      (data: Message[]) => {
        if(data == null) {
          this.messageList = [];
        }
        else {
          this.messageList = data;
        }
      }, (error: any) => console.log(error), () => console.log('fetched!')
    );
  }

  listen(user: string){
    let username: string = user;
    return (message: Message) => {
      if(message.sender !== username){
        
        this.addNotification(message);
        if(this.closed == false && this.currentChat && this.currentChat.id == message.chatRoom){
          //chat window is open, push messages onto list of current messages
          this.messageList.push(message);          
        }
        
      }
    }
  }

  addNotification(message: Message){
    if(this.singleMessageView == false){
      return;
    }
    if(this.notifs[message.chatRoom]){
      this.notifs[message.chatRoom]++;
    } else {
      this.notifs[message.chatRoom] = 1;
    }
  }

  sendMessage(messageForm: any) {
    let newMessage: any = {id: '0', sender: this.currentUser, 
                          message : messageForm.message.trim(),
                          chatRoom: this.currentChat.id, timeStamp: new Date()};
    
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
      this.messageList.push({...newMessage, sender: {id: newMessage.sender}});
      
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
