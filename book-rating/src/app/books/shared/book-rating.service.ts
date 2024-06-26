import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: book.rating === 5 ? book.rating : book.rating + 1
    };
  }

  rateDown(book: Book): Book {
    // Early Exit
    if (book.rating <= 1) {
      return book;
    }

    // Spread Operator
    return {
      ...book,
      rating: book.rating - 1
    };
  }
}
