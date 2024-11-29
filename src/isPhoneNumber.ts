import phone from 'phone';

/**
 * checks whether the input is a valid phone number
 */
export const isPhoneNumber = (input: string): boolean => phone(input).isValid;
