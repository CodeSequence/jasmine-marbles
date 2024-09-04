import {
  CompleteNotification,
  ErrorNotification,
  NextNotification,
  Observable,
  ObservableNotification,
  Subscription,
} from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { isEqual } from 'lodash';
import { format as prettyFormat } from 'pretty-format';
import { getTestScheduler } from './scheduler';
import { TestObservable } from './test-observables';
import { mapSymbolsToNotifications } from './map-symbols-to-notifications';
import { TestMessages } from './types';
import { unparseMarble } from './marble-unparser';

/*
 * Based on source code found in rxjs library
 * https://github.com/ReactiveX/rxjs/blob/master/src/testing/TestScheduler.ts
 *
 */
export function materializeInnerObservable<T>(
  observable: Observable<T>,
  outerFrame: number,
): TestMessages {
  const messages: TestMessages = [];
  const scheduler = getTestScheduler();

  observable.subscribe({
    next: (value: any) => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: {
          kind: 'N',
          value,
          error: undefined,
        } as NextNotification<T>,
      });
    },
    error: (error: any) => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: {
          kind: 'E',
          value: undefined,
          error,
        } as ErrorNotification,
      });
    },
    complete: () => {
      messages.push({
        frame: scheduler.frame - outerFrame,
        notification: {
          kind: 'C',
          value: undefined,
          error: undefined,
        } as CompleteNotification,
      });
    },
  });
  return messages;
}

export function toHaveSubscriptionsComparer(
  actual: TestObservable,
  marbles: string | string[],
) {
  const marblesArray: string[] =
    typeof marbles === 'string' ? [marbles] : marbles;
  const results = marblesArray.map((marbles) =>
    TestScheduler.parseMarblesAsSubscriptions(marbles),
  );

  expect(results).toEqual(actual.getSubscriptions());

  return { pass: true, message: () => '' };
}

export function toBeObservableComparer(
  actual: TestObservable,
  fixture: TestObservable,
) {
  const results: TestMessages = [];
  let subscription: Subscription;
  const scheduler = getTestScheduler();

  scheduler.schedule(() => {
    subscription = actual.subscribe({
      next: (x: any) => {
        let value = x;

        // Support Observable-of-Observables
        if (x instanceof Observable) {
          value = materializeInnerObservable(value, scheduler.frame);
        }

        results.push({
          frame: scheduler.frame,
          notification: {
            kind: 'N',
            value,
            error: undefined,
          } as NextNotification<any>,
        });
      },
      error: (error: any) => {
        results.push({
          frame: scheduler.frame,
          notification: {
            kind: 'E',
            value: undefined,
            error,
          } as ErrorNotification,
        });
      },
      complete: () => {
        results.push({
          frame: scheduler.frame,
          notification: {
            kind: 'C',
            value: undefined,
            error: undefined,
          } as CompleteNotification,
        });
      },
    });
  });
  scheduler.flush();

  const expected = TestScheduler.parseMarbles(
    fixture.marbles,
    fixture.values,
    fixture.error,
    true,
    true,
  );

  try {
    expect(results).toEqual(expected);

    return { pass: true, message: () => '' };
  } catch (e) {
    const mapNotificationToSymbol = buildNotificationToSymbolMapper(
      fixture.marbles,
      expected,
      isEqual,
    );
    const receivedMarble = unparseMarble(results, mapNotificationToSymbol);

    const message = formatMessage(
      fixture.marbles,
      expected,
      receivedMarble,
      results,
    );
    return { pass: false, message: () => message };
  }
}

function buildNotificationToSymbolMapper(
  expectedMarbles: string,
  expectedMessages: TestMessages,
  equalityFn: (a: any, b: any) => boolean,
) {
  const symbolsToNotificationsMap = mapSymbolsToNotifications(
    expectedMarbles,
    expectedMessages,
  );
  return (notification: ObservableNotification<any>) => {
    const mapped = Object.keys(symbolsToNotificationsMap).find((key) =>
      equalityFn(symbolsToNotificationsMap[key], notification),
    )!;

    return mapped || '?';
  };
}

function formatMessage(
  expectedMarbles: string,
  expectedMessages: TestMessages,
  receivedMarbles: string,
  receivedMessages: TestMessages,
) {
  return `
Expected: ${expectedMarbles},
Received: ${receivedMarbles},
    
Expected:
${prettyFormat(expectedMessages)}
    
Received:
${prettyFormat(receivedMessages)}
  `;
}
