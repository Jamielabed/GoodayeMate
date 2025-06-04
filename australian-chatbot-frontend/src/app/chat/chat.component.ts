import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  text: string;
  audioUrl?: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./chat.component.css'],
  standalone: true
})
export class ChatComponent implements OnInit {
  userMessage = '';
  messages: Message[] = [];
  isLoading = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages.push({
      text: "G'day mate! I'm Bruce, your AI cobber. How can I help you today?",
      isUser: false
    });
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    const userMsg = this.userMessage;
    this.messages.push({ text: userMsg, isUser: true });
    this.isLoading = true;
    this.userMessage = '';

    this.chatService.sendMessage(userMsg, null).subscribe(
      (response) => {
        this.messages.push({ text: response.text, audioUrl: response.audio_url, isUser: false });
        this.isLoading = false;
      },
      (error) => {
        console.error('Error:', error);
        this.messages.push({ text: 'Strewth! Something went wrong, mate. Try again later.', isUser: false });
        this.isLoading = false;
      }
    );
  }
}