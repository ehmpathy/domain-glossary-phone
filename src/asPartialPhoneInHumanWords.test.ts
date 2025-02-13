import { given, then } from 'test-fns';

import { asPartialPhoneInHumanWords } from './asPartialPhoneInHumanWords';

describe('asPartialPhoneInHumanWords', () => {
  given('a 2 digit input', () => {
    then('should show that areacode', () => {
      const output = asPartialPhoneInHumanWords({ number: '51' });
      expect(output).toEqual('(51');
    });
  });

  given('a 3 digit input', () => {
    then('should show the areacode', () => {
      const output = asPartialPhoneInHumanWords({ number: '512' });
      expect(output).toEqual('(512');
    });
  });

  given('a 5 digit input', () => {
    then('should show that next section has been started', () => {
      const output = asPartialPhoneInHumanWords({ number: '51255' });
      expect(output).toEqual('(512) 55');
    });
  });

  given('a 8 digit input', () => {
    then('should show that last section has been started', () => {
      const output = asPartialPhoneInHumanWords({ number: '51255501' });
      expect(output).toEqual('(512) 555-01');
    });
  });

  given('a 10 digit input', () => {
    then('should show that the number has been completed', () => {
      const output = asPartialPhoneInHumanWords({ number: '5125550101' });
      expect(output).toEqual('(512) 555-0101');
    });
  });

  given('a 12 digit input', () => {
    then('should show clamp the output to strip the extra digits', () => {
      const output = asPartialPhoneInHumanWords({ number: '512555010122' });
      expect(output).toEqual('(512) 555-0101');
    });
  });

  given('an input with stars (*)', () => {
    then('should treat the stars as valid digits', () => {
      const output = asPartialPhoneInHumanWords({ number: '512*****01' });
      expect(output).toEqual('(512) ***-**01');
    });
  });
});
