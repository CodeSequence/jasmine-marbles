import { TestScheduler } from 'rxjs/testing/TestScheduler';
import {
  TestHotObservable,
  TestColdObservable,
  TestObservable,
} from './src/test-observables';
import {
  initTestScheduler,
  getTestScheduler,
  resetTestScheduler,
} from './src/scheduler';

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
  return new TestHotObservable(marbles, values, error);
}

export function cold(
  marbles: string,
  values?: any,
  error?: any,
): TestColdObservable {
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

export function addMatchers() {
  jasmine.addMatchers({
    toBeObservable: () => ({
      compare: function(actual: TestObservable, test: TestObservable) {
        getTestScheduler()
          .expectObservable(actual)
          .toBe(test.marbles, test.values, test.error);
        getTestScheduler().flush();

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
