import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { delay, Subject } from 'rxjs';
import { Post } from 'src/app/models/post';
import { scrollProperties } from 'src/app/models/scrollProperties';
import { PostService } from 'src/app/services/post-service.service';
import { PostComponent } from '../post/post.component';
import * as AOS from 'aos';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  private get maxScrollLeft(): number {
    return this._scrollWidth - this._clientWidth;
  }
  private scrollLeft: number = 0;
  public evenSubject = new Subject<scrollProperties>();
  private _scrollWidth: number = 0;
  private _clientWidth: number = 0;
  lastNavigationStartAt: number = 0;
  scrollBufferWindow: number = 10;
  @ViewChild('panel', {static:true}) panel: ElementRef= {} as ElementRef;
  constructor(private postService: PostService,private elementRef: ElementRef) {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  ngAfterContentInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const element=this.panel.nativeElement as HTMLElement;
  }
  ngOnInit(): void {
    
  }
  onScroll(event: Event) {
    if (Date.now() - this.lastNavigationStartAt > this.scrollBufferWindow) {
      this.triggetScrollEvent(this.getHtmlElementFromEvent(event));
      this.lastNavigationStartAt = Date.now();

    }

  }
  triggetScrollEvent(element:HTMLElement):void{
    this.scrollLeft = element.scrollLeft;
    this._scrollWidth = element.scrollWidth;
    this._clientWidth = element.clientWidth;
    
    this.evenSubject.next({
      maxScrollLeft: this.maxScrollLeft,
      scrollLeft: this.scrollLeft,
      scrollProportion: this._clientWidth / this._scrollWidth
    });
  }
  getHtmlElementFromEvent(event: Event): HTMLHtmlElement {
    return event.srcElement as HTMLHtmlElement;
  }
}
