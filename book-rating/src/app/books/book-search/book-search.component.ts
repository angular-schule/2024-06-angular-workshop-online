import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookStoreService } from '../shared/book-store.service';
import { Observable, debounceTime, filter, of, switchMap } from 'rxjs';
import { Book } from '../shared/book';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });
  private bs = inject(BookStoreService);

  books2$ = this.searchControl.valueChanges.pipe(
    debounceTime(200),
    filter(term => term.length >= 3),
    switchMap(term => this.bs.search(term))
  );

  // Alternative
  books$ = this.searchControl.valueChanges.pipe(
    debounceTime(200),
    switchMap(term => {
      if (term.length >= 3) {
        return this.bs.search(term);
      } else {
        return of([]);
      }
    })
  );

  books = toSignal(this.books$);

}
