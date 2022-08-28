import { AnimationBuilder } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { scrollProperties } from 'src/app/models/scrollProperties';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post | undefined;
  @Input() position: number = 0;
  @Input() events: Observable<scrollProperties> | undefined;

  private scrollPositionScale: number = 0;
  private scrollProportion: number = 0.75;
  public get scalePosition(): number {
    var temp = this.scrollPositionScale * (1 - this.scrollProportion)
    return ((this.position - temp) / this.scrollProportion);
  }
  public get degreePosition(): number {
    return Math.sin(Math.PI * ((this.scalePosition / 2) + 0.25));
  }
  private postWidth: number = 20;
  private postHeight: number = 60;

  private imageWidth: number = 22.7;
  private imageHeight: number = 45;

  private style(width: number, height: number): {} {
    return {
      width: `${width * this.degreePosition}vw`,
      height: `${height * this.degreePosition}vh`
    };
  }
  public get stylePost() {
    return {
      width: `${this.postWidth * this.degreePosition}vw`,
      height: `${this.postHeight * this.degreePosition}vh`,
      transform: `perspective(500px) rotateY(${this.scalePosition*180+25}deg)`,

    };
  }
  public get imageStyle() {
    return this.style(this.imageWidth, this.imageHeight);
  }


  private cardImageWidht: number = 22.7;
  private cardImageHeight: number = 45;


  private eventsSubcriptions: Subscription | undefined;
  constructor(private _builder: AnimationBuilder) {

  }

  ngOnInit(): void {
    this.eventsSubcriptions = this.events?.subscribe(
      (value) => {
        this.scrollPositionScale = value.scrollLeft / value.maxScrollLeft;
        this.scrollPositionScale = Math.round(this.scrollPositionScale * 8) / 8
        console.log(this.scrollPositionScale)
        // console.log(this.position,this.scalePosition)
      }
    )
  }
}
