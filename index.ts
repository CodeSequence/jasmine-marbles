import { Notification } from 'rxjs/Notification';
import { Observable } from 'rxjs/Observable';
import { TestMessage } from 'rxjs/testing/TestMessage';
import { TestScheduler } from 'rxjs/testing/TestScheduler';

import { getTestScheduler, initTestScheduler, resetTestScheduler } from './src/scheduler';
import { TestColdObservable, TestHotObservable, TestObservable } from './src/test-observables';

export { getTestScheduler, initTestScheduler, resetTestScheduler } from './src/scheduler';

export function hot(marbles: string, values?: any, error?: any): TestHotObservable {
  return new TestHotObservable(marbles, values, error);
}

export function cold(marbles: string, values?: any, error?: any): TestColdObservable {
  return new TestColdObservable(marbles, values, error);
}

export function time(marbles: string): number {
  return getTestScheduler().createTime(marbles);
}

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toBeObservable: any;
    }
  }
}

/*
* Based on source code found in rxjs library
* https://github.com/ReactiveX/rxjs/blob/master/src/testing/TestScheduler.ts
*
*/
function materializeInnerObservable(observable: Observable<any>,
                                    outerFrame: number,): TestMessage[] {
  const messages: TestMessage[] = [];
  const scheduler = getTestScheduler();

  observable.subscribe(
    value => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: Notification.createNext(value),
      });
    },
    err => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: Notification.createError(err),
      });
    },
    () => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: Notification.createComplete(),
      });
    },
  );
  return messages;
}

export function addMatchers() {
  jasmine.addMatchers({
    toBeObservable: () => ({
      compare: function (actual: TestObservable, fixture: TestObservable) {
        const results: TestMessage[] = [];
        const scheduler = getTestScheduler();

        scheduler.schedule(() => {
          actual.subscribe(
            (x: any) => {
              let value = x;

              // Support Observable-of-Observables
              if (x instanceof Observable) {
                value = materializeInnerObservable(value, scheduler.frame);
              }

              results.push({
                frame: scheduler.frame,
                notification: Notification.createNext(value),
              });
            },
            (err: any) => {
              results.push({
                frame: scheduler.frame,
                notification: Notification.createError(err),
              });
            },
            () => {
              results.push({
                frame: scheduler.frame,
                notification: Notification.createComplete(),
              });
            },
          );
        });
        scheduler.flush();

        const expected = TestScheduler.parseMarbles(
          fixture.marbles,
          fixture.values,
          fixture.error,
          true,
        );

        expect(results).toEqual(expected);

        return { pass: true };
      },
    }),
  });
}

if (typeof module === 'object' && module.exports) {
  jasmine.getEnv().beforeAll(() => addMatchers());

  jasmine.getEnv().beforeEach(() => initTestScheduler());
  jasmine.getEnv().afterEach(() => {
    getTestScheduler().flush();
    resetTestScheduler();
  });
}
