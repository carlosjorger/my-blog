import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService  implements InMemoryDbService {

  constructor() { }
  createDb() {
    const users = [
      { id: 1, firstName: 'Carlos J', lastMame: 'Rodriguez', email: 'carlito@gmail.com', password: '1234' },
      { id: 2, firstName: 'Marlon', lastMame: 'Nomelose', email: 'marlito@gmail.com', password: '1234' }
    ];
    const posts = [
      { id: 1, title: 'First Blog', author: 'AD', image: 'the-powerful-pickle-rick-photo', 
      publishDate: '2022-08-01', excert: 'This is a summary of the content' }
      ,{ id: 2, title: 'First Blog', author: 'AD', image: 'the-powerful-pickle-rick-photo', 
      publishDate: '2022-08-01', excert: 'This is a summary of the content' }
    ];
    return {
      users:users,
      posts:posts,
    }
  }
}
