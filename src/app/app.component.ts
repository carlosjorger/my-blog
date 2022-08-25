import { Component } from '@angular/core';
import { Post } from './models/post';
import { PostService } from './services/post-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myBlog';
  
  
}
