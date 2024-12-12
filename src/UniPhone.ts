import { DomainLiteral } from 'domain-objects';

import { UniPhoneNumber } from './UniPhoneNumber';

/**
 * .what = a universal phone declaration
 */
export interface UniPhone {
  id?: number;

  /**
   * always declare in terms of uni phone number, to make phone universal
   */
  number: UniPhoneNumber;
}
export class UniPhone extends DomainLiteral<UniPhone> implements UniPhone {}
