import { TestScheduler } from 'rxjs/testing';

/**
 * Exported return type of TestMessage[] to avoid importing internal APIs.
 */
export type TestMessages = ReturnType<typeof TestScheduler.parseMarbles>;

/**
 * Exported return type of SubscriptionLog to avoid importing internal APIs.
 */
export type SubscriptionLogs = ReturnType<
  typeof TestScheduler.parseMarblesAsSubscriptions
>;
