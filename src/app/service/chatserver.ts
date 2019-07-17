import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class ChatServer {

   public static readonly portNumber: number = 8080;

  constructor() { } 

  sendMessage(message: Message): void {
    console.log("Message recieved by server");
  } 


}