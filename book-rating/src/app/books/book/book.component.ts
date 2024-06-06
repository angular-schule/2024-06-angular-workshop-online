import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingComponent } from '../rating/rating.component';

// Aufgabe dieser Komponente:
// ein einzelnes Buch anzeigen
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  @Input({ required: true }) book?: Book;
  // book = input<Book>();

  // hier fließen Daten zur Elternkomponente hinaus
  // von unten nach oben
  // @Output() rateUp = new EventEmitter<Book>();
  // @Output() rateDown = new EventEmitter<Book>();

  // output() geht erst ab Angular 17.3
  rateUp = output<Book>();
  rateDown = output<Book>();

  doRateUp() {
    // bitte immer prüfen, ob es wirklich ein Buch ist, denn:
    // beim Empfangen des Events ist der Typ "Book" und nicht mehr "Book | undefined"
    if (this.book) {
      this.rateUp.emit(this.book);
    }
  }

  doRateDown() {
    if (this.book) {
      this.rateDown.emit(this.book);
    }
  }
}
