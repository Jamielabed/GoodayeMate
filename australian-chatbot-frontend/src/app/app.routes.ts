import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: '', component: ChatComponent }, // Default route for the ChatComponent
  { path: '**', redirectTo: '' } // Redirect unknown routes to the default route
];