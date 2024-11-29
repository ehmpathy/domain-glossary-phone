import { UniPhoneNumber } from './UniPhoneNumber';
import { asUniPhoneNumber } from './asUniPhoneNumber';

/**
 * checks whether a string is a universally formatted phone number
 */
export const isUniPhoneNumber = (input: string): input is UniPhoneNumber => {
  try {
    const universal = asUniPhoneNumber(input);
    return input === universal;
  } catch {
    // if there was an error, then its not a phone number, so defo not a universal phone number
    return false;
  }
};
