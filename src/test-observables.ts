import { Scheduler } from 'rxjs/Scheduler';
import { TestMessage } from 'rxjs/testing/TestMessage';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import { HotObservable } from 'rxjs/testing/HotObservable';

export interface ObservableTestFixture {
  marbles: string;
  values?: any;
  error?: any;
}

export class TestColdObservable extends ColdObservable<any> {
  constructor(public fixture: ObservableTestFixture, messages: TestMessage[], scheduler: Scheduler) {
    super(messages, scheduler);
  }
}

export class TestHotObservable extends HotObservable<any> {
  constructor(public fixture: ObservableTestFixture, messages: TestMessage[], scheduler: Scheduler) {
    super(messages, scheduler);
  }
}

export type TestObservable = TestColdObservable | TestHotObservable;
