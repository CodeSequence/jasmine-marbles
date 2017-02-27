import { TestHotObservable, TestColdObservable, TestObservable } from './src/test-observables';
import { TestScheduler } from './src/scheduler';
import { observableMatcher } from './src/matcher';


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
    interface Matchers {
      toBeObservable: any;
    }
  }
}

jasmine.getEnv().beforeAll(() => jasmine.addMatchers({
  toBeObservable: () => ({
    compare: function (actual: TestObservable, { fixture }: TestObservable) {
      getTestScheduler().expectObservable(actual).toBe(fixture.marbles, fixture.values, fixture.error);
      getTestScheduler().flush();

      return { pass: true };
    }
  })
}));

jasmine.getEnv().beforeEach(() => scheduler = new TestScheduler(observableMatcher));
jasmine.getEnv().afterEach(() => {getTestScheduler().flush(); scheduler = null; });
