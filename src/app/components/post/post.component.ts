import { animate, animateChild, AnimationBuilder, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { scrollProperties } from 'src/app/models/scrollProperties';
import { ScrollingModule } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [

  ]
})
export class PostComponent implements OnInit {

  @Input() post: Post | undefined;
  @Input() position: number = 0;
  @Input() events: Observable<scrollProperties> | undefined;

  public scrollPositionScale: number = 0;
  private scrollProportion: number = 0.75;
  public get positionValue(): number {
    var temp = this.scrollPositionScale * (1 - this.scrollProportion);
    var result = ((this.position - temp) / this.scrollProportion);
    return result;
  }
  public get scaleValue(): number {
    return Math.sin(Math.PI * ((this.positionValue / 2) + 0.25));
  }
  public get degree(): number {
    return this.changeDegre(this.positionValue * 130 + 25);
  }
  private eventsSubcriptions: Subscription | undefined;
  constructor(private elementRef: ElementRef, private _builder: AnimationBuilder) {


  }
  @ViewChild("postContainer", { read: ElementRef })
  public postContainer: ElementRef = {} as ElementRef;
  ngOnInit(): void {

    this.eventsSubcriptions = this.events?.subscribe(
      (value) => {
        this.scrollPositionScale = value.scrollLeft / value.maxScrollLeft;
        this.scrollPositionScale = this.scrollPositionScale;
        this.scrollProportion = value.scrollProportion;
        this.doAnimationByScrollPositionScale()
      }
    )
  }
  changeDegre(degre: number): number {
    return degre > 180 ? 180 : degre;
  }
  mouseOverPost() {
    this.doAnimation(0.1, 0, 1, 1, 1);
  }
  mouseOutPost() {
    this.doAnimationByScrollPositionScale()
  }
  doAnimationByScrollPositionScale(){
    if (this.scrollPositionScale < 0.05) {
      this.doAnimation(0.5, 0, 1, 1, 1);
    }
    else {
      this.doAnimation(0.1, this.degree, this.scaleValue, this.scaleValue, 1);
    }
  }
  doAnimation(duration: number, rotateYDegree: number, scale3D1: number, scale3D2: number, scale3D3: number,): void {
    this._builder.build([
      animate(`${duration}s`, style({
        transform: `perspective(800px) rotateY(${rotateYDegree}deg) scale3d(${scale3D1},${scale3D2},${scale3D3})`,
      }))
    ]).create(this.postContainer.nativeElement).play();
  }
}
