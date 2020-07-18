import { TestMessage } from 'rxjs/internal/testing/TestMessage';
import { Notification } from 'rxjs';

export function mapSymbolsToNotifications(
  marbles: string,
  messagesArg: TestMessage[],
): { [key: string]: Notification<any> } {
  const messages = messagesArg.slice();
  const result: { [key: string]: Notification<any> } = {};

  for (let i = 0; i < marbles.length; i++) {
    const symbol = marbles[i];

    switch (symbol) {
      case ' ':
      case '-':
      case '^':
      case '(':
      case ')':
        break;
      case '#':
      case '|': {
        messages.shift();
        break;
      }
      default: {
        if ((symbol.match(/^[0-9]$/) && i === 0) || marbles[i - 1] === ' ') {
          const buffer = marbles.slice(i);
          const match = buffer.match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);
          if (match) {
            i += match[0].length - 1;
          }
          break;
        }

        const message = messages.shift()!;
        result[symbol] = message.notification;
      }
    }
  }

  return result;
}
