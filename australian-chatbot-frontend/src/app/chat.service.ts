import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private backendUrl = 'http://127.0.0.1:8000'; // Backend URL

  constructor(private http: HttpClient) {}

  // Send a message to the backend
  sendMessage(message: string, conversationId: string | null): Observable<any> {
    return this.http.post(`${this.backendUrl}/chat`, { text: message, conversation_id: conversationId });
  }

  // Fetch audio from the backend
  getAudio(audioUrl: string): Observable<Blob> {
    return this.http.get(audioUrl, { responseType: 'blob' });
  }
}