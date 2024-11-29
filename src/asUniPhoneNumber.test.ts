import { asUniPhoneNumber } from './asUniPhoneNumber';

describe('asUniPhoneNumber', () => {
  it('should be able to normalize a phone number', () => {
    const fromVariant1 = asUniPhoneNumber('317 821 1234');
    const fromVariant2 = asUniPhoneNumber('(317) 821-1234');
    const fromVariant3 = asUniPhoneNumber('317821-1234');
    expect(fromVariant1).toEqual('+13178211234');
    expect(fromVariant2).toEqual(fromVariant1);
    expect(fromVariant3).toEqual(fromVariant2);
  });
});
