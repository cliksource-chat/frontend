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
    this.chatService.getAllChatRooms()
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

  messageCandidate(candidate: User) {
    let makeChat: boolean = this.canMakeNewChat(candidate);

    // will create chat if doesn't exist already between current user and candidate
    if(makeChat) {
      let newChat: ChatRoom = { id: "", created: new Date(), user1: this.loginService.getCurrentUser(),
                            user2: candidate };

      this.chatService.createChatRoom(newChat);
      console.log("new chat created");
      
    } else { console.log("no chat created"); }

    // make chat popup here
    this.popupService.updatePopUpStatus(false);
  }

}
