import { animate, animateChild, AnimationBuilder, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
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
            transform: 'perspective(800px) rotateY({{degre}}deg)',
          }), {
          params: {
            width: 20,
            height: 60,
            degre: 180,
          }
        }),
        transition('*<=>*',
          group(
            [
              query("@*", [animateChild()], { optional: true }),
              animate('0.1s')
            ]
          )
          , {
            params: {
              width: 20,
              height: 60,
              degre: 20
            }
          }
        ),

      ]
    ),
    trigger('changeFont',
      [
        state('*',
          style({
            fontSize: '{{fontSize}}vw',
          }), {
          params: {
            fontSize: 1.2,
          }
        }),
        transition('*<=>*',
          animate('0.1s')
        ),

      ]
    )
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

  private imageWidth: number = 23;
  private imageHeight: number = 45;

  private fontSize: number = 1.2;

  public get styleFont() {
    return {
      fontSize: this.postWidth*0.06 * this.degreePosition
    }
  }
  public get stylePostParams() {
    return {
      width: this.postWidth * this.degreePosition,
      height: this.postHeight * this.degreePosition,
      degre: this.changeDegre(this.scalePosition * 180 + 25)
    };
  }

  public get imageStyle() {
    return {
      width: `100%`,
      height: `${this.imageHeight * this.degreePosition}vh`,

    };
  }
  private eventsSubcriptions: Subscription | undefined;
  constructor(private _builder: AnimationBuilder) {


  }
  changeDegre(degre: number): Number {
    return degre > 180 ? 180 : degre;
  }
  ngOnInit(): void {
    this.eventsSubcriptions = this.events?.subscribe(
      (value) => {
        this.scrollPositionScale = value.scrollLeft / value.maxScrollLeft;
        this.scrollPositionScale = Math.round(this.scrollPositionScale * 8) / 8;
        this.scrollProportion = value.scrollProportion;
        console.log(this.scrollPositionScale)
      }
    )
  }
}
