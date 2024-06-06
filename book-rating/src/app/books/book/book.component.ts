import { Component, Input, input } from '@angular/core';
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

  doRateUp() {}

  doRateDown() {}
}