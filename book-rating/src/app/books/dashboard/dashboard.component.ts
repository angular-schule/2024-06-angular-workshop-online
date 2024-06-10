import { Component, inject } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private rs = inject(BookRatingService);
  private bs = inject(BookStoreService);

  books: Book[] = [];

  // constructor(private rs: BookRatingService) {
  constructor() {
    this.bs.getAll().subscribe(books => {
      this.books = books;
    });

    /*this.bs.getAll().subscribe({
      next: books => {
        this.books = books;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });*/
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  doDeleteBook(book: Book) {
    this.bs.delete(book.isbn).subscribe(() => {
      this.bs.getAll().subscribe(books => {
        this.books = books;
      })
    })
  }

  private updateList(changedBook: Book) {
    // [1, 2, 3, 4, 5, 6].map(e => e * 10) // [10, 20, 30, 40, 50, 60]
    // [1,2,3,4,5,6,7,8,9,10].filter(e => e > 5) // [6, 7, 8, 9, 10]

    this.books = this.books.map(b => {
      if (b.isbn === changedBook.isbn) {
        return changedBook;
      } else {
        return b;
      }
    });
  }
}
