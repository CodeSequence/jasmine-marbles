import { TestScheduler } from 'rxjs/testing';
import { unparseMarble } from '../src/marble-unparser';

describe('Marble unparser', () => {
  describe('Basic unparsing with single frame symbol', () => {
    it('should unparse single frame', () => {
      expectToUnparse('a', 'a');
    });

    it('should respect empty frames', () => {
      expectToUnparse('---a-aaa--a', '---a-aaa--a');
    });

    it('should trim empty suffix frames', () => {
      expectToUnparse('---a-aaa--a----', '---a-aaa--a');
    });

    it('should support errors', () => {
      expectToUnparse('--a-#', '--a-#');
    });

    it('should support stream completion', () => {
      expectToUnparse('--a-|', '--a-|');
    });

    it('should support time progression', () => {
      expectToUnparse('- 20ms -a', '----a');
    });

    it('should support groups', () => {
      expectToUnparse('-(aa)--a', '-(aa)--a');
    });

    function expectToUnparse(sourceMarble: string, expectedMarble: string) {
      const testMessage = TestScheduler.parseMarbles(
        sourceMarble,
        { a: 1 },
        undefined,
        true,
        true,
      );

      expect(unparseMarble(testMessage, n => 'a')).toBe(expectedMarble);
    }
  });
});
