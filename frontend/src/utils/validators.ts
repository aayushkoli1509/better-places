import { IValidator } from '@types';

const enum EValidatorType {
  REQUIRE = 'REQUIRE',
  MINLENGTH = 'MINLENGTH',
  MAXLENGTH = 'MAXLENGTH',
  MIN = 'MIN',
  MAX = 'MAX',
  EMAIL = 'EMAIL',
  FILE = 'FILE'
}

export const VALIDATOR_REQUIRE = () => ({ type: EValidatorType.REQUIRE });
export const VALIDATOR_FILE = () => ({ type: EValidatorType.FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
  type: EValidatorType.MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
  type: EValidatorType.MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = (val: number) => ({
  type: EValidatorType.MIN,
  val: val
});
export const VALIDATOR_MAX = (val: number) => ({
  type: EValidatorType.MAX,
  val: val
});
export const VALIDATOR_EMAIL = () => ({ type: EValidatorType.EMAIL });

export const validate = (value: string, validators: IValidator[]) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === EValidatorType.REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === EValidatorType.MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val!;
    }
    if (validator.type === EValidatorType.MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val!;
    }
    if (validator.type === EValidatorType.MIN) {
      isValid = isValid && +value >= validator.val!;
    }
    if (validator.type === EValidatorType.MAX) {
      isValid = isValid && +value <= validator.val!;
    }
    if (validator.type === EValidatorType.EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
