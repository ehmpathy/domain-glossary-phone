import { DomainLiteral } from 'domain-objects';

export interface UniPhone {
  id?: number;
  number: string;
}
export class UniPhone extends DomainLiteral<UniPhone> implements UniPhone {}
