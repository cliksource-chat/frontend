import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ChatRoom } from '../model/chatroom.model';
import { LoginService } from '../service/login.service';
import { ChatroomService } from '../service/chatroom.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profilePic = "https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png";

  testUsers: User[] = [];
  //   { id: "1", firstname: "Harry", lastname: "Potter", type: "Employer" },
  //   { id: "2", firstname: "James", lastname: "Potter", type: "Employer" },
  //   { id: "3", firstname: "Tom", lastname: "Riddle", type: "Candidate" },
  //   { id: "4", firstname: "Sirius", lastname: "Black", type: "Candidate" }
  // ]

  constructor(private loginService: LoginService, private chatService: ChatroomService) { }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates() {
    this.loginService.getAllUsers()
      .subscribe(
        (data: User[]) => {
          if(data == null)
            this.testUsers = [];
          else
            this.testUsers = data;
        },
        (error: any) => console.log(error),
        () => console.log('fetched all users')
      );
  }

  messageCandidate(candidate: User) {
    let makeChat: boolean = this.canMakeNewChat(candidate);

    // will create chat if doesn't exist already between current user and candidate
    if(makeChat) {
      let newChat: ChatRoom = { id: "", created: new Date(), user1: this.loginService.getCurrentUser(),
                            user2: candidate };

      console.log("new chat created");
      //this.chatService.createChatRoom(newChat);
      
    } else { console.log("no chat created"); }

  }

  canMakeNewChat(candidate: User): boolean {

    let allChats: any;
    // get all chats
    this.chatService.getAllChatRooms()
      .subscribe(
        (data: ChatRoom[]) => {
          if(allChats == null)
            allChats = []
          else
            allChats = data;
        },
        (error: any) => console.log(error),
        () => console.log('fetched user')
      );
    
    let makeChat: boolean = true;
    
    // check if chat with these two users already exists
    for(let chat = 0; chat < allChats.length; chat++) {
      if( allChats[chat].user1.id == this.loginService.getCurrentUserID() &&
          allChats[chat].user2.id == candidate.id) {
        makeChat = false;
      }
    }

    return makeChat;
  }

}
