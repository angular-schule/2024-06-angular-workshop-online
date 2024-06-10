import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // Ersatzobjekt für den BookRatingService
    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // BRS ersetzen: Immer wenn BRS angefordert wird,
        // wird stattdessen ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock },
        {
          provide: BookStoreService,
          useValue: {
            getAll: () => of([])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // TS-Klasseninstanz
    component = fixture.componentInstance;

    // Zugriff auf DOM-Element (Host-Element der Komponente)
    // const element = fixture.nativeElement.querySelector('p');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp', () => {
    // ARRANGE
    // Service injecten: das ist aber eigentlich unser ratingMock
    const rs = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '123' } as Book; // Type Assertion, bitte vorsichtig verwenden!

    // Methode überwachen, um sie später prüfen zu können
    // spyOn(rs, 'rateUp').and.returnValue(testBook);
    // spyOn(rs, 'rateUp').and.callFake(b => b)
    // callThrough: nutze die originale Methode trotzdem,
    // um den Wert zu erzeugen, damit `rateUp` weiterhin ein Buch zurückgibt
    spyOn(rs, 'rateUp').and.callThrough();

    // ACT
    // Komponentenmethode aufrufen
    component.doRateUp(testBook);

    // ASSERT
    // prüfen, ob service.rateUp aufgerufen wurde
    expect(rs.rateUp).toHaveBeenCalledOnceWith(testBook);

  });
});
