import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, interval } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';


@Injectable()
export class BookEffects {

  private actions$ = inject(Actions);
  private bs = inject(BookStoreService);


  /*
  - wenn Action "loadBooks", dann
  - Service aufrufen: Bücher laden
  - bei Erfolg: dann Action "loadBooksSuccess" ausgeben
  - bei Fehler: dann Action "loadBooksFailure" ausgeben
  */

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() => this.bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books })),
        catchError(err => of(BookActions.loadBooksFailure({ error: err.message })))
      ))
    )
  });


  test$ = createEffect(() => {
    return of({ type: 'TEST' })

  });

}
