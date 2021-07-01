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

import {
  toHaveSubscriptionsComparer,
  toBeObservableComparer,
} from './src/utils';

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

export function addMatchers() {
  /**
   * expect.extend is an API exposed by jest-circus,
   * the default runner as of Jest v27. If that method
   * is not available, assume we're in a Jasmine test
   * environment.
   */
  if (!expect.extend) {
    jasmine.addMatchers({
      toHaveSubscriptions: () => ({
        compare: toHaveSubscriptionsComparer,
      }),
      toBeObservable: (_utils, _equalityTester) => ({
        compare: toBeObservableComparer,
      }),
    });
  } else {
    expect.extend({
      toHaveSubscriptions: toHaveSubscriptionsComparer,
      toBeObservable: toBeObservableComparer,
    });
  }
}

export function setupEnvironment() {
  beforeAll(() => addMatchers());

  beforeEach(() => initTestScheduler());
  afterEach(() => {
    getTestScheduler().flush();
    resetTestScheduler();
  });
}

setupEnvironment();
