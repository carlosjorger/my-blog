import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post:Post | undefined;
  constructor() { 

  }

  ngOnInit(): void {
    
  }

}
