import { Observable } from 'rxjs/Observable';
import { SubscriptionLog } from 'rxjs/testing/SubscriptionLog';

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

  getSubscriptions(): SubscriptionLog[] {
    return this.source['subscriptions'];
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

  getSubscriptions(): SubscriptionLog[] {
    return this.source['subscriptions'];
  }
}

export type TestObservable = TestColdObservable | TestHotObservable;
