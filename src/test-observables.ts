import { Scheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { getTestScheduler } from './scheduler';

export class TestColdObservable extends Observable<any> {
  constructor(
    public marbles: string,
    public values?: any[],
    public error?: any,
  ) {
    super();

    this.source = getTestScheduler().createColdObservable(
      marbles,
      values,
      error,
    );
  }
}

export class TestHotObservable extends Observable<any> {
  constructor(
    public marbles: string,
    public values?: any[],
    public error?: any,
  ) {
    super();

    this.source = getTestScheduler().createHotObservable(
      marbles,
      values,
      error,
    );
  }
}

export type TestObservable = TestColdObservable | TestHotObservable;
