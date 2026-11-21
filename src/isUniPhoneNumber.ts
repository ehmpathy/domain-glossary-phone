import { withAssure } from 'type-fns';

import { asUniPhoneNumber } from './asUniPhoneNumber';
import type { UniPhoneNumber } from './UniPhoneNumber';

/**
 * checks whether a string is a universally formatted phone number
 */
export const isUniPhoneNumber = withAssure(
  (input: string): input is UniPhoneNumber => {
    try {
      const universal = asUniPhoneNumber(input);
      return input === universal;
    } catch {
      // if there was an error, then its not a phone number, so defo not a universal phone number
      return false;
    }
  },
);
