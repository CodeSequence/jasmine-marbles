import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';

import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';
import { Subject } from 'rxjs/Subject';

import {
  cold,
  getTestScheduler,
  hot,
  initTestScheduler,
  resetTestScheduler,
  time,
} from '../index';

describe('Integration', () => {
  it('should work with a cold observable', () => {
    const provided = of(1);

    const expected = cold('(b|)', { b: 1 });

    expect(provided).toBeObservable(expected);
  });

  it('should work with a hot observable', () => {
    const provided = new Subject<number>();

    const expected = hot('--a--b', { a: 1, b: 2 });

    expect(expected.do(v => provided.next(v))).toBeObservable(expected);
  });

  it('should work with the test scheduler', () => {
    const delay = time('-----a|');
    const val = 1;
    const provided = timer(delay, getTestScheduler()).mapTo(val);

    const expected = hot('------(a|)', { a: val });

    expect(provided).toBeObservable(expected);
  });

  it('should throw if the TestScheduler is not initialized', () => {
    resetTestScheduler();

    try {
      getTestScheduler();
    } catch (err) {
      expect(err).toEqual(new Error('No test scheduler initialized'));
    }

    initTestScheduler();
  });
});
