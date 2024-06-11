import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // of('Berlin', 'Wien', 'Zürich')
    // from([1,2,3,4,5])
    // interval(1000)        // ---0---1---2---3---4---5 ...
    // timer(2000)           // ------0|
    // timer(2000, 1000)     // ------0---1---2---3---4---5 ...
    // timer(0, 1000)        // 0---1---2---3---4---5 ...


    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });

    /******************************/

    // Subscriber: ähnlich Observer, aber "Innensicht"
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);

      sub.next(10);
      sub.next(20);
      sub.next(30);

      setTimeout(() => sub.next(100), 2000)
      setTimeout(() => sub.next(200), 4000)
      // setTimeout(() => sub.error('FEHLER'), 4100)
      setTimeout(() => sub.complete(), 6000)
      setTimeout(() => sub.next(666), 8000) // wird nicht durchgestellt, weil nach complete!
    }

    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG'),
    };

    // producer(obs);

    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);


    const interval$ = new Observable<number>(sub => {
      setInterval(() => sub.next(Math.random()), 1000);
    });

    const http$ = new Observable<any[]>(sub => {
      fetch('https://api.angular.schule/books')
        .then(res => res.json())
        .then(books => {
          sub.next(books);
          sub.complete();
        }).catch(err => sub.error(err));
    });



    /******************************/
  }

  private log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
