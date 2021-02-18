import { TestScheduler } from 'rxjs/testing';

import { observableMatcher } from './matcher';

let scheduler: TestScheduler | null;

export function initTestScheduler(): void {
  scheduler = new TestScheduler(observableMatcher);
  scheduler['runMode'] = true;
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
