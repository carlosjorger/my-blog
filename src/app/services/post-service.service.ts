import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl = 'api/posts/';
  constructor(private http: HttpClient) { }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
