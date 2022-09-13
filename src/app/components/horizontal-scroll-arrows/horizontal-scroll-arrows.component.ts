import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horizontal-scroll-arrows',
  templateUrl: './horizontal-scroll-arrows.component.html',
  styleUrls: ['./horizontal-scroll-arrows.component.css']
})
export class HorizontalScrollArrowsComponent implements OnInit {


  @Input() panel:HTMLDivElement={} as HTMLDivElement;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.panel.clientWidth,this.panel.scrollWidth)
  }
  timeoutHandler: number | undefined;
  public mouseup() {
    if (this.timeoutHandler) {
      window.clearInterval(this.timeoutHandler);
      this.timeoutHandler = undefined;
    }
  }

  public mousedown(displacement:number) {
    this.panel.scrollLeft += displacement;
    this.timeoutHandler = window.setInterval(() => {
      this.panel.scrollLeft += displacement;
    }, 10);
  }

}
