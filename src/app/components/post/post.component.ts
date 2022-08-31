import { animate, animateChild, AnimationBuilder, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { scrollProperties } from 'src/app/models/scrollProperties';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('changeCard',
      [
        state('*',
          style({
            width: '{{width}}vw',
            height: '{{height}}vh',
            transform: 'perspective(800px) rotateY({{degre}}deg) scale3d({{scale}},{{scale}},1)',
          }), {
          params: {
            width: 20,
            height: 60,
            degre: 180,
            scale: 1
          }
        }),
        transition('*<=>*',
          animate('0.5s',
            style({
              width: '{{width}}vw',
              height: '{{height}}vh',
              transform: 'perspective(800px) rotateY({{degre}}deg) scale3d({{scale}},{{scale}},1)',
            }))
          , {
            params: {
              width: 20,
              height: 60,
              degre: 20,
              scale: 1
            }
          }
        ),

      ]
    ),
  ]
})
export class PostComponent implements OnInit {

  @Input() post: Post | undefined;
  @Input() position: number = 0;
  @Input() events: Observable<scrollProperties> | undefined;

  public scrollPositionScale: number = 0;
  private scrollProportion: number = 0.75;
  public get scalePosition(): number {
    var temp = this.scrollPositionScale * (1 - this.scrollProportion);
    var result = ((this.position - temp) / this.scrollProportion);
    if (result > 1) {
      return 1;
    }
    if (result < 0) {
      return 0;
    }

    return result;
  }
  public get degreePosition(): number {
    return Math.sin(Math.PI * ((this.scalePosition / 2) + 0.25));
  }
  private postWidth: number = 20;
  private postHeight: number = 60;

  private imageHeight: number = 45;

  public get stylePostParams() {
    return {
      width: this.postWidth,
      height: this.postHeight,
      degre: this.changeDegre(this.scalePosition * 130 + 25),
      scale: this.degreePosition,
    };
  }

  public get imageStyle() {
    return {
      width: `100%`,
      height: `${this.imageHeight * this.degreePosition}vh`,

    };
  }
  private eventsSubcriptions: Subscription | undefined;
  constructor(private elementRef: ElementRef, private _builder: AnimationBuilder) {


  }
  changeDegre(degre: number): Number {
    return degre > 180 ? 180 : degre;
  }
  @ViewChild("postContainer", { read: ElementRef })
  public postContainer: ElementRef = {} as ElementRef;
  ngOnInit(): void {
    this.eventsSubcriptions = this.events?.subscribe(
      (value) => {
        this.scrollPositionScale = value.scrollLeft / value.maxScrollLeft;
        this.scrollPositionScale = this.scrollPositionScale;
        this.scrollProportion = value.scrollProportion;
        let animationFactory = this._builder.build([
          animate('0.1s', style({
            transform: `perspective(500px) rotateY(${this.changeDegre(this.scalePosition * 130 + 25)}deg) scale3d(${this.degreePosition},${this.degreePosition},1)`,
          }))
        ]);
        animationFactory.create(this.postContainer.nativeElement).play();

      }
    )
  }
}
