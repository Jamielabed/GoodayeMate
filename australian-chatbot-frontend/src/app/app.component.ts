import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent, CommonModule], // Ensure ChatComponent and RouterOutlet are imported
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected title = 'Bruce - Your Aussie AI Chatbot';
}