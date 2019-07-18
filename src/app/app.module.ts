import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MessageService} from '../app/service/message.service';

// import {Stomp} from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';

// let socket: object = SockJS('http://localhost:8090/chat');

//let stompClient: object = Stomp.client("http://localhost:8090/chat");




@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
