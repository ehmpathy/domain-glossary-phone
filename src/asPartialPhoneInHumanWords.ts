/**
 * .what = casts a partial phone into human words
 * .example
 *   - 33 => (33
 *   - 3335 => (333) 5
 *   - 33355577 => (333) 555-77
 *   - 333555777777 => (333) 555-7777
 * .usecases
 *   - input masks
 */
export const asPartialPhoneInHumanWords = (input: {
  number: string;
}): string => {
  // remove all non alphas
  const numberSanitized = input.number.replace(/[^0-9\*]/g, '');

  // create formatted output
  return [
    numberSanitized.slice(0, 3) ? `(${numberSanitized.slice(0, 3)}` : '',
    numberSanitized.slice(3, 6) ? `${numberSanitized.slice(3, 6)}` : '',
    numberSanitized.slice(6, 10) ? `-${numberSanitized.slice(6, 10)}` : '',
  ]
    .join('')
    .trim();
};
