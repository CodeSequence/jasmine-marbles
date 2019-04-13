import { Observable } from 'rxjs';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';

import { getTestScheduler } from './scheduler';
import { TestScheduler } from 'rxjs/testing';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

export class TestColdObservable extends Observable<any> {
  constructor(
    public marbles: string,
    public values?: any[],
    public error?: any,
  ) {
    super();

    const scheduler = getTestScheduler();

    const messages = TestScheduler.parseMarbles(
      marbles,
      values,
      error,
      undefined,
      true,
    );
    const cold = new ColdObservable<any>(messages, scheduler);
    this.source = cold;
    scheduler.coldObservables.push(cold);
  }

  getSubscriptions(): SubscriptionLog[] {
    return (this.source as any)['subscriptions'];
  }
}

export class TestHotObservable extends Observable<any> {
  constructor(
    public marbles: string,
    public values?: any[],
    public error?: any,
  ) {
    super();

    const scheduler = getTestScheduler();

    const messages = TestScheduler.parseMarbles(
      marbles,
      values,
      error,
      undefined,
      true,
    );
    const hot = new HotObservable<any>(messages, scheduler);
    this.source = hot;
    scheduler.hotObservables.push(hot);
  }

  getSubscriptions(): SubscriptionLog[] {
    return (this.source as any)['subscriptions'];
  }
}

export type TestObservable = TestColdObservable | TestHotObservable;
