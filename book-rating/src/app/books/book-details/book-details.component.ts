import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { map, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  private route = inject(ActivatedRoute);
  private bs = inject(BookStoreService);

  book$ = this.route.paramMap.pipe(
    map(params => params.get('isbn')!),
    switchMap(isbn => this.bs.getSingle(isbn))
  );

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
    // this.book$ = ...

  }
}

/*
  TODO
  - ISBN aus der Route lesen
  - Service, HTTP Buch laden
  - Buch anzeigen
*/
