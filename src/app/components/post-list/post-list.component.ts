import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  public get maxScrollLeft():number{
    return this._scrollWidth-this._clientWidth;
  }
  public scrollLeft:number=0;

  private _scrollWidth:number=0;
  private _clientWidth:number=0;
  constructor(private postService: PostService) {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }
  ngOnInit(): void {
  }
  onScroll(event: Event) {
    this.scrollLeft=this.getHtmlElementFromEvent(event).scrollLeft;
    this._scrollWidth=this.getHtmlElementFromEvent(event).scrollWidth;
    this._clientWidth=this.getHtmlElementFromEvent(event).clientWidth;
    console.log(this.scrollLeft, this.maxScrollLeft)
  }
  getHtmlElementFromEvent(event: Event):HTMLHtmlElement{
    return event.srcElement as HTMLHtmlElement;
  }
}
