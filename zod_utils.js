const _ = require('lodash');
const { z } = require('zod');
const moment = require('moment');
const FormValidation = require('../../common/components/react-configurable-form/form_validation');

const ZodValidEmpty = z
  .union([z.null(), z.undefined(), z.nan(), z.literal('')])
  .transform(() => null);

const ZodOptionalNonEmptyString = z
  .string()
  .nullish()
  .or(ZodValidEmpty)
  .transform(val => val || undefined);

const ZodNullableNonEmptyString = z
  .string()
  .nullish()
  .transform(val => val || null)
  .nullable();

const ZodNullishObject = z
  .object()
  .nullish()
  .transform(val => val || {});

const ZodMoment = z
  .any()
  .transform(val => moment(val))
  .refine(m => m.isValid(), 'Invalid Moment!');

const ZodPhoneNumber = z.union([
  z.undefined(),
  z.string().refine(val =>
    z.string()
    .transform(s => s.replace(/[^-|+|\\.|\\(|\\)|\d)](.+)?$/, ''))
    .safeParse(val).success,
    'Invalid phone number!'
  ),
]).describe('Phone number');

const ZodCSVCell = z
  .unknown()
  .transform((s) => {
    if (!_.isString(s)) {
      if (_.isNil(s)) {
        s = '';
      }
      if (_.isObjectLike(s)) {
        s = JSON.stringify(s);
      }
    }
    return `"${_.toString(s).replace(/"/g, '""')}"`;
  })
  .pipe(z.string());

const ZodEmail = z
  .union([
    z.string().email(),
    z.string().refine(FormValidation.email, 'Invalid e-mail address!'),
  ])
  .describe('E-mail address');

const ZodValidNumberOptional = z.union([
  z.null(),
  z.coerce
    .string()
    .transform(x => x.replace(/,/g, ''))
    .refine(FormValidation.isNumber)
    .transform(x => parseFloat(x))
    .or(ZodValidEmpty),
]);

const ZodPostalCode = z.coerce
  .string()
  .transform(val => _.replace(val, /\s/gi, ''))
  .pipe(z.coerce.number())
  .pipe(z.coerce.string().min(3).max(10))
  .or(ZodValidEmpty);


const ZodWebsite = z.string().nonempty().refine(FormValidation.website);
const ZodGender = z.string().transform(val => _.toLower(val)).pipe(z.enum(['male', 'female']));

const ZodCommaSeparatedString = z.union([
  ZodOptionalNonEmptyString.default('').transform(
  val => _(val)
    .split(',')
    .map(_.trim)
    .compact()
    .value()
  ),
  z.unknown(),
]).pipe(z.array(z.string()));

module.exports = {
  ZodOptionalNonEmptyString,
  ZodNullableNonEmptyString,
  ZodNullishObject,
  ZodMoment,
  ZodPhoneNumber,
  ZodCSVCell,
  ZodEmail,
  ZodPostalCode,
  ZodValidNumberOptional,
  ZodValidEmpty,
  ZodWebsite,
  ZodGender,
  ZodCommaSeparatedString,
};
