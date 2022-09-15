import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-horizontal-scroll-arrows',
  templateUrl: './horizontal-scroll-arrows.component.html',
  styleUrls: ['./horizontal-scroll-arrows.component.css']
})
export class HorizontalScrollArrowsComponent implements OnInit {


  @Input() panel: HTMLDivElement = {} as HTMLDivElement;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.panel.clientWidth,this.panel.scrollWidth)
  }
  timeoutHandler: Subscription | undefined;
  public mouseup() {
    // console.log(this.timeoutHandler)
    this.timeoutHandler?.unsubscribe();
  }

  public mousedown(displacement: number) {
    this.panel.scrollLeft += displacement;
    // this.timeoutHandler = window.setInterval(() => {
    //   // console.log(this.panel.scrollLeft)
     
    // }, 20);
    this.timeoutHandler=interval(15).subscribe(()=>{
      window.requestAnimationFrame(() => {
        this.panel.scrollLeft += displacement;
      });
    })
  }

}
