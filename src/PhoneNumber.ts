import { AsOfGlossary } from 'domain-glossaries';

/**
 * a phone number, any format
 * - e.g., (317) 111-3333
 */
export type PhoneNumber = AsOfGlossary<
  string,
  'domain-glossary-phone.PhoneNumber'
>;
