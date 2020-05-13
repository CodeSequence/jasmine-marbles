import { TestScheduler } from 'rxjs/testing';
import { mapSymbolsToNotifications } from '../src/map-symbols-to-notifications';

describe('Map symbols to frames', () => {
  it('should map single symbol', () => {
    const result = encodeSymbols('a', { a: 1 });
    expect(result.a.value).toEqual(1);
  });

  it('should map multiple symbols', () => {
    const result = encodeSymbols('---a--bc-d|', { a: 1, b: 2, c: 3, d: 4 });
    expect(result.a.value).toEqual(1);
    expect(result.b.value).toEqual(2);
    expect(result.c.value).toEqual(3);
    expect(result.d.value).toEqual(4);
  });

  it('should support groups', () => {
    const result = encodeSymbols('---(abc)--(aa)-|', {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
    expect(result.a.value).toEqual(1);
    expect(result.b.value).toEqual(2);
    expect(result.c.value).toEqual(3);
  });

  it('should support subscription point', () => {
    const result = encodeSymbols('---a-^-b-|', { a: 1, b: 2 });
    expect(result.a.value).toEqual(1);
    expect(result.b.value).toEqual(2);
  });

  it('should support time progression', () => {
    const result = encodeSymbols('-- 100ms -a-^-b-|', { a: 1, b: 2 });
    expect(result.a.value).toEqual(1);
    expect(result.b.value).toEqual(2);
  });

  function encodeSymbols(marbles: string, values: { [key: string]: any }) {
    const expected = TestScheduler.parseMarbles(
      marbles,
      values,
      undefined,
      true,
      true,
    );

    return mapSymbolsToNotifications(marbles, expected);
  }
});
