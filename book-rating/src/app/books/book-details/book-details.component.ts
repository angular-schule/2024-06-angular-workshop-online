import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  private route = inject(ActivatedRoute);
  private bs = inject(BookStoreService);

  book?: Book;

  constructor() {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // PUSH
    // TODO: Verschachtelte Subscriptions vermeiden
    // mögliche Strategien
    // - parallel und "alles egal" (mergeMap)
    // - Warteschlange (concatMap)
    // - abbrechen (switchMap)
    // - ignorieren (exhaustMap)

    this.route.paramMap.pipe(
      map(params => params.get('isbn')!),
      switchMap(isbn => this.bs.getSingle(isbn))
    ).subscribe(book => {
      this.book = book;
    });
  }
}

/*
  TODO
  - ISBN aus der Route lesen
  - Service, HTTP Buch laden
  - Buch anzeigen
*/
