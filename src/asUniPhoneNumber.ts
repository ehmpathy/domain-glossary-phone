import { UnexpectedCodePathError } from '@ehmpathy/error-fns';
import { phone } from 'phone';

import { UniPhoneNumber } from './UniPhoneNumber';

/**
 * casts a phone number into the universal format, E.164
 */
export const asUniPhoneNumber = (input: string): UniPhoneNumber => {
  const { phoneNumber: normalizedPhoneNumber } = phone(input);
  if (!normalizedPhoneNumber)
    throw new UnexpectedCodePathError(
      'input was not a valid phone number. can not be cast to domain-glossary-phone-number',
      { input },
    );
  return normalizedPhoneNumber as UniPhoneNumber;
};
