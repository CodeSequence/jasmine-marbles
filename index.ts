import { Notification, Observable, Subscription } from 'rxjs';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
import { TestMessage } from 'rxjs/internal/testing/TestMessage';
import { TestScheduler } from 'rxjs/testing';

import {
  getTestScheduler,
  initTestScheduler,
  resetTestScheduler,
} from './src/scheduler';
import {
  TestColdObservable,
  TestHotObservable,
  TestObservable,
} from './src/test-observables';
import { unparseMarble } from './src/marble-unparser';
import { mapSymbolsToNotifications } from './src/map-symbols-to-notifications';

export {
  getTestScheduler,
  initTestScheduler,
  resetTestScheduler,
} from './src/scheduler';

export function hot(
  marbles: string,
  values?: any,
  error?: any,
): TestHotObservable {
  return new TestHotObservable(marbles.trim(), values, error);
}

export function cold(
  marbles: string,
  values?: any,
  error?: any,
): TestColdObservable {
  return new TestColdObservable(marbles.trim(), values, error);
}

export function time(marbles: string): number {
  return getTestScheduler().createTime(marbles.trim());
}

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toBeObservable(expected: TestObservable): boolean;
      toHaveSubscriptions(marbles: string | string[]): boolean;
    }
  }
  namespace jest {
    interface Matchers<R> {
      toBeObservable(expected: TestObservable): R;
      toHaveSubscriptions(marbles: string | string[]): R;
    }
  }
}

/*
* Based on source code found in rxjs library
* https://github.com/ReactiveX/rxjs/blob/master/src/testing/TestScheduler.ts
*
*/
function materializeInnerObservable(
  observable: Observable<any>,
  outerFrame: number,
): TestMessage[] {
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
    toHaveSubscriptions: () => ({
      compare: function(actual: TestObservable, marbles: string | string[]) {
        const marblesArray: string[] =
          typeof marbles === 'string' ? [marbles] : marbles;
        const results: SubscriptionLog[] = marblesArray.map(marbles =>
          TestScheduler.parseMarblesAsSubscriptions(marbles),
        );

        expect(results).toEqual(actual.getSubscriptions());

        return { pass: true };
      },
    }),
    toBeObservable: (utils, equalityTester) => ({
      compare: function(actual: TestObservable, fixture: TestObservable) {
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
          true,
        );

        if (utils.equals(results, expected)) {
          return { pass: true };
        }

        const mapNotificationToSymbol = buildNotificationToSymbolMapper(
          fixture.marbles,
          expected,
          utils.equals,
        );
        const receivedMarble = unparseMarble(results, mapNotificationToSymbol);

        const message = formatMessage(
          fixture.marbles,
          expected,
          receivedMarble,
          results,
        );
        return { pass: false, message };
      },
    }),
  });
}

function buildNotificationToSymbolMapper(
  expectedMarbles: string,
  expectedMessages: TestMessage[],
  equalityFn: (a: any, b: any) => boolean,
) {
  const symbolsToNotificationsMap = mapSymbolsToNotifications(
    expectedMarbles,
    expectedMessages,
  );
  return (notification: Notification<any>) => {
    const mapped = Object.keys(symbolsToNotificationsMap).find(key => {
      return equalityFn(symbolsToNotificationsMap[key], notification);
    })!;

    return mapped || '?';
  };
}

function formatMessage(
  expectedMarbles: string,
  expectedMessages: TestMessage[],
  receivedMarbles: string,
  receivedMessages: TestMessage[],
) {
  return `
    Expected: ${expectedMarbles},
    Received: ${receivedMarbles},
    
    Expected:
    ${JSON.stringify(expectedMessages)}
    
    Received:
    ${JSON.stringify(receivedMessages)},
  `;
}

export function setupEnvironment() {
  jasmine.getEnv().beforeAll(() => addMatchers());

  jasmine.getEnv().beforeEach(() => initTestScheduler());
  jasmine.getEnv().afterEach(() => {
    getTestScheduler().flush();
    resetTestScheduler();
  });
}

setupEnvironment();
