import { asUniPhoneInHumanWords } from './asUniPhoneInHumanWords';
import { isUniPhoneNumber } from './isUniPhoneNumber';

describe('asUniPhoneInHumanWords', () => {
  it('should look right', () => {
    const result = asUniPhoneInHumanWords({
      number: isUniPhoneNumber.assure('+13175557777'),
    });
    expect(result).toEqual('(317) 555-7777');
  });
});
