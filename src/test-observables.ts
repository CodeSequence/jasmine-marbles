import { Observable } from 'rxjs';

import { getTestScheduler } from './scheduler';
import { SubscriptionLogs } from './types';

export class TestColdObservable extends Observable<any> {
  constructor(
    public marbles: string,
    public values?: { [name: string]: any },
    public error?: any,
  ) {
    super();

    const scheduler = getTestScheduler();
    const cold = scheduler.createColdObservable(marbles, values, error);

    this.source = cold;
  }

  getSubscriptions(): SubscriptionLogs[] {
    return (this.source as any)['subscriptions'];
  }
}

export class TestHotObservable extends Observable<any> {
  constructor(
    public marbles: string,
    public values?: { [name: string]: any },
    public error?: any,
  ) {
    super();

    const scheduler = getTestScheduler();
    const hot = scheduler.createHotObservable(marbles, values, error);

    this.source = hot;
  }

  getSubscriptions(): SubscriptionLogs[] {
    return (this.source as any)['subscriptions'];
  }
}

export type TestObservable = TestColdObservable | TestHotObservable;
