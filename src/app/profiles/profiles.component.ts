import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ChatRoom } from '../model/chatroom.model';
import { LoginService } from '../service/login.service';
import { ChatroomService } from '../service/chatroom.service';
import { ChatpopupService } from '../service/chatpopup.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profilePic = "https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png";

  allUsers: User[] = [];
  allChats: any[] = [];

  constructor(private loginService: LoginService, private chatService: ChatroomService, 
    private popupService: ChatpopupService) { }

  ngOnInit() {
    this.getUsers();
    this.getAllChatRooms();
  }

  // get all the users in database
  async getUsers() {
    this.loginService.getAllUsers()
      .toPromise().then(
        (data: User[]) => {
          if(data == null)
            this.allUsers = [];
          else
            this.allUsers = data;
          console.log("all users: " + this.allUsers.length);
        },
        // (error: any) => console.log(error),
        () => console.log('fetched all users')
      );
  }

  // get all the chatrooms in database
  async getAllChatRooms() {
    await this.chatService.getAllChatRooms()
      .toPromise().then(
        (data: ChatRoom[]) => {
          if(data == null) 
            this.allChats = [];
          else
            this.allChats = data;
        },
        // (error: any) => console.log(error),
        () => console.log('fetched all chat rooms')
      );
  }

  // check if candidate given doesn't have a chat with employer
  // returns true if chat needs to be created
  // returns false if chat already exists between them
  canMakeNewChat(candidate: User): boolean {
    let makeChat = true;
    
    for (let chat = 0; chat < this.allChats.length; chat++) {
      if(this.allChats[chat].user1.id == this.loginService.getCurrentUserID() &&
          this.allChats[chat].user2.id == candidate.id) 
      {
        makeChat = false;
      }
    }

    return makeChat;
  }

  async makeNewRoom(candidate: User){
    let newChat: any = {user1: this.loginService.getCurrentUser(),
    user2: candidate };

    await this.chatService.createChatRoom(newChat).toPromise().then(room => console.log('created new chat') );
    //console.log("new chat created");
  }


  async messageCandidate(candidate: User) {
    let makeChat: boolean = this.canMakeNewChat(candidate);

    // will create chat if doesn't exist already between current user and candidate
    if(makeChat) {
      await this.makeNewRoom(candidate);
      await this.getAllChatRooms();
      
    } else { console.log("no chat created"); }

    console.log(this.allChats);
    let selectedChat: ChatRoom[] = this.allChats.filter(room => room.user1.id == this.loginService.getCurrentUserID() &&
     room.user2.id == candidate.id);
    // make chat popup here
    this.popupService.updatePopUpStatus(false);
    //this.popupService.updateMessageView(false);
    console.log('from profile component: selected chat:')
    console.log(selectedChat[0])
    this.popupService.updateCurrentChat(selectedChat[0]);
  }

}
