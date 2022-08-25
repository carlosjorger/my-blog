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
  posts:Post[]=[];
  constructor(private postService: PostService){
    this.postService.getPosts().subscribe(posts=>{
      this.posts=posts;
      console.log(posts);
    })
  }
}
