import { TestScheduler as _TestScheduler } from 'rxjs/testing/TestScheduler';
import { TestColdObservable, TestHotObservable } from './test-observables';


export class TestScheduler extends _TestScheduler {
  constructor(assertDeepEqual: (actual: any, expected: any) => boolean | void) {
    super(assertDeepEqual);
  }

  createColdObservable(marbles: string, values?: any, error?: any): TestColdObservable {
    if (marbles.indexOf('^') !== -1) {
      throw new Error('cold observable cannot have subscription offset "^"');
    }
    if (marbles.indexOf('!') !== -1) {
      throw new Error('cold observable cannot have unsubscription marker "!"');
    }
    const messages = TestScheduler.parseMarbles(marbles, values, error);
    const cold = new TestColdObservable({ marbles, values, error }, messages, this);
    this['coldObservables'].push(cold);
    return cold;
  }

  createHotObservable(marbles: string, values?: any, error?: any): TestHotObservable {
    if (marbles.indexOf('!') !== -1) {
      throw new Error('hot observable cannot have unsubscription marker "!"');
    }
    const messages = TestScheduler.parseMarbles(marbles, values, error);
    const subject = new TestHotObservable({ marbles, values, error }, messages, this);
    this['hotObservables'].push(subject);
    return subject;
  }
}
