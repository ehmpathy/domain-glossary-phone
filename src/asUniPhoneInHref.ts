import { UniPhone } from './UniPhone';

export const asUniPhoneInHref = (
  { number }: UniPhone,
  mode: 'CALL' | 'TEXT',
): string => {
  // manipulate phone format to be callable (tel:+13334445555)
  const formattedPhoneNumber = number;
  const hrefVerb = mode === 'CALL' ? 'tel' : 'sms';
  const href = [hrefVerb, formattedPhoneNumber].join(':');
  return href;
};
