import { TestScheduler } from 'rxjs/testing/TestScheduler';

import { observableMatcher } from './matcher';

let scheduler: TestScheduler | null;

export function initTestScheduler(): void {
  scheduler = new TestScheduler(observableMatcher);
}

export function getTestScheduler(): TestScheduler {
  if (scheduler) {
    return scheduler;
  }

  throw new Error('No test scheduler initialized');
}

export function resetTestScheduler(): void {
  scheduler = null;
}
