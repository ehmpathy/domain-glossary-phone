import { AsOfGlossary } from 'domain-glossaries';

/**
 * a phone number in the universal E.164 format
 * - E.164 example: +18175698900
 */
export type UniPhoneNumber = AsOfGlossary<string, 'uni-phone'>;
