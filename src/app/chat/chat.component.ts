import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class ChatComponent implements OnInit, AfterViewChecked {
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
  closed = true;
  singleMessageView = true;

  chatList: ChatRoom[];

  currentChat: ChatRoom;

  currentUser: string;

  userIsEmployer: boolean;
                      

  constructor(private messageService: MessageService, private loginService: LoginService) {
    // sets scroll to bottom at creation
    this.getAllChats(); 
    
    if(loginService.getCurrentUserType().toLowerCase() == "employer") {
      this.userIsEmployer = true;
    } 
    else { 
      this.userIsEmployer = false; 
    }

    this.scrollToBottom();
   }

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUserID();
    console.log("Current User ID: " + this.currentUser);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  minimize() {
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
          //force program to wait 1 second to allow sockets to finish connecttion process
          await new Promise(resolve => setTimeout(resolve, 1000));
         
          this.chatList.forEach(room => this.messageService.connect(this.currentUser, room.id, this.listen(this.currentUser)))
        }
      );
  }

  selectChat(selectedChat: ChatRoom) {
    this.currentChat = selectedChat;
    this.changeView();
    
    
    //connect to chat 
    // !!!!!!!!!!!!!
    // (move this later)
    // !!!!!!!!!!!!!!!
    //this.messageService.connect(this.currentUser, selectedChat.id, this.listen(this.currentUser));
    
    this.messageService.getMessages(this.currentChat.id)
    .subscribe(
      (data: Message[]) => {
        // empty message array
        // try {
        //   this.messageList.length = 0;
        // } catch (error) { }
        // grab messages for this chat
        if(data == null) {
          this.messageList = [];
        }
        else {
          this.messageList = data;
        }
      }, (error: any) => console.log(error), () => console.log('fetched!')
    );

    //console.log(this.messageList);
  }

  listen(user: string){
    let username: string = user;
    return (message: Message) => {
      if(message.sender !== username){
        if(this.closed == true){
          //add notification that message was recieved
          // to be implemented
        } else {
          //chat window is open, push messages onto list of current messages
          this.messageList.push(message);
        }
        
      }
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
