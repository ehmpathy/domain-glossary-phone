# domain-glossary-phone

![test](https://github.com/ehmpathy/domain-glossary-phone/workflows/test/badge.svg)
![publish](https://github.com/ehmpathy/domain-glossary-phone/workflows/publish/badge.svg)

A glossary of intuitive, universally unambiguous phone definitions and useful procedures.

# purpose

declare a universally unambiguous serialization format for phones
- `PhoneNumber` = [E.164](https://en.wikipedia.org/wiki/E.164)
- `Phone` = `{ number: PhoneNumber }`

usecases
- clarify the format a string should be in (`const phoneNumber: PhoneNumber = '+13231110101'`)
- cast date to universal format (`const phoneNumber: PhoneNumber = toPhoneNumber('(323) 111-0101')`)
- narrow type of strings with runtime validation (`if (!isPhoneNumber(input)) throw new Error('wrong format')`)


# install

```sh
npm install domain-glossary-phone
```

# use

## Phone

### declare that a phone or phone.number must be in the universal format

```ts
const phone: Phone;
const phoneNumber: PhoneNumber;
```


### assure that a phone number is in the universal phormat

```ts
const phone: Phone = { number: isPhoneNumber.assure('+13231110101') }
```


### cast a phone number into the universal format

```ts
const phone: Phone = { number: asPhoneNumber('(323) 111-0101') }
```

