import { ObservableNotification } from 'rxjs';

import { TestMessages } from './types';

export function unparseMarble(
  result: TestMessages,
  assignSymbolFn: (a: ObservableNotification<any>) => string,
): string {
  const FRAME_TIME_FACTOR = 10; // need to be up to date with `TestScheduler.frameTimeFactor`
  let frames = 0;
  let marble = '';
  let isInGroup = false;
  let groupMembersAmount = 0;
  let index = 0;

  const isNextMessageInTheSameFrame = () => {
    const nextMessage = result[index + 1];
    return nextMessage && nextMessage.frame === result[index].frame;
  };

  result.forEach((testMessage, i) => {
    index = i;

    const framesDiff = testMessage.frame - frames;
    const emptyFramesAmount =
      framesDiff > 0 ? framesDiff / FRAME_TIME_FACTOR : 0;
    marble += '-'.repeat(emptyFramesAmount);

    if (isNextMessageInTheSameFrame()) {
      if (!isInGroup) {
        marble += '(';
      }
      isInGroup = true;
    }

    switch (testMessage.notification.kind) {
      case 'N':
        marble += assignSymbolFn(testMessage.notification);
        break;
      case 'E':
        marble += '#';
        break;
      case 'C':
        marble += '|';
        break;
    }

    if (isInGroup) {
      groupMembersAmount += 1;
    }

    if (!isNextMessageInTheSameFrame() && isInGroup) {
      marble += ')';
      isInGroup = false;
      frames += (groupMembersAmount + 1) * FRAME_TIME_FACTOR;
      groupMembersAmount = 0;
    } else {
      frames = testMessage.frame + FRAME_TIME_FACTOR;
    }
  });

  return marble;
}
