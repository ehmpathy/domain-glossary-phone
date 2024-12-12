import { UniPhone } from './UniPhone';

/**
 * .what = casts a uni phone into human words
 * .example
 *   - +13335557777 => (333) 555-7777
 */
export const asUniPhoneInHumanWords = (input: UniPhone): string => {
  // Validate input: must start with '+' followed by digits
  const phoneRegex = /^\+(\d{1,3})(\d{3})(\d{3})(\d{4})$/;
  const match = input.number.match(phoneRegex);

  if (!match) {
    throw new Error(
      'Invalid Phone format. Expected format: +<country-code><10-digit-phone>',
    );
  }

  // Extract groups
  const [, , areaCode, centralOfficeCode, lineNumber] = match;

  // Format the phone number
  return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
};
