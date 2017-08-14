import { Notification } from 'rxjs/Notification';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TestMessage } from 'rxjs/testing/TestMessage';

import { observableMatcher } from './src/matcher';
import { TestScheduler } from './src/scheduler';
import { TestColdObservable, TestHotObservable, TestObservable } from './src/test-observables';

let scheduler: TestScheduler | null;

export function getTestScheduler() {
  if (scheduler) {
    return scheduler;
  }

  throw new Error('No test scheduler initialized');
}

export function hot(marbles: string, values?: any, error?: any): TestHotObservable {
  return getTestScheduler().createHotObservable(marbles, values, error);
}

export function cold(marbles: string, values?: any, error?: any): TestColdObservable {
  return getTestScheduler().createColdObservable(marbles, values, error);
}

export function time(marbles: string): number {
  return getTestScheduler().createTime(marbles);
}

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toEqualObservable: any;
    }
  }
}


/*
* Based on source code found in rxjs library
* https://github.com/ReactiveX/rxjs/blob/master/src/testing/TestScheduler.ts
*
*/
function materializeInnerObservable(observable: Observable<any>, outerFrame: number): TestMessage[] {
  const messages: TestMessage[] = [];
  const scheduler = getTestScheduler();

  observable.subscribe(
    value => {
      messages.push({
        frame: scheduler.frame - outerFrame, notification: Notification.createNext(value),
      });
    },
    err => {
      messages.push({
        frame: scheduler.frame - outerFrame, notification: Notification.createError(err),
      });
    },
    () => {
      messages.push({
        frame: scheduler.frame - outerFrame, notification: Notification.createComplete(),
      });
    }
  );
  return messages;
}

/*
* Performs toEqual as an alternative to toBeObservable.
* Based on source code found in rxjs library
* https://github.com/ReactiveX/rxjs/blob/master/src/testing/TestScheduler.ts
*
* Provides a more detailed error response on why an observable
* doesn't match
*
* Usage => expect(effect$).toEqualObservable(coldObservable);
*
*/
jasmine.getEnv().beforeAll(() =>
  jasmine.addMatchers({
    toEqualObservable: () => ({
      compare: function (actual: TestObservable, { fixture }: TestObservable) {
        const results: TestMessage[] = [];
        let subscription: Subscription;
        const scheduler = getTestScheduler();

        scheduler.schedule(() => {
          subscription = actual.subscribe(
            (x: any) => {
              let value = x;

              // Support Observable-of-Observables
              if (x instanceof Observable) {
                value = materializeInnerObservable(value, scheduler.frame);
              }

              results.push({ frame: scheduler.frame, notification: Notification.createNext(value) });
            },
            (err: any) => {
              results.push({ frame: scheduler.frame, notification: Notification.createError(err) });
            },
            () => {
              results.push({ frame: scheduler.frame, notification: Notification.createComplete() });
            }
          );
        });
        scheduler.flush();

        const expected = TestScheduler.parseMarbles(fixture.marbles, fixture.values, fixture.error, true);

        expect(results).toEqual(expected);

        return { pass: true };
      },
    }),
  })
);

jasmine.getEnv().beforeEach(() => scheduler = new TestScheduler(observableMatcher));
jasmine.getEnv().afterEach(() => { getTestScheduler().flush(); scheduler = null; });
