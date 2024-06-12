import { Component, OnDestroy, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil, shareReplay } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './multicast.component.html',
  standalone: true,
  imports: [HistoryComponent, AsyncPipe, DecimalPipe]
})
export class MulticastComponent implements OnDestroy {

  private mvs = inject(MeasureValuesService);

  listeners: number[] = [];
  logStream$ = new ReplaySubject<string>();
  private destroy$ = new Subject<void>();
  private listenerIndex = 1;

  measureValues$: Subject<number>;

  constructor() {
    /**************!!**************/

    /*this.measureValues$ = this.mvs.getValues().pipe(share({
      connector: () => new ReplaySubject(1)
    }));*/
    // this.measureValues$ = this.mvs.getValues().pipe(shareReplay(1));

    // this.measureValues$ = new Subject();
    this.measureValues$ = new BehaviorSubject(0);
    // this.measureValues$ = new ReplaySubject(5);
    this.mvs.getValues().subscribe(this.measureValues$);

    /**************!!**************/

  }

  addListener() {
    this.listeners.push(this.listenerIndex++);
  }

  addConsoleListener() {
    const index = this.listenerIndex++;
    this.measureValues$.pipe(takeUntil(this.destroy$)).subscribe(e => this.logStream$.next(`Listener #${index}: ${e}`));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
