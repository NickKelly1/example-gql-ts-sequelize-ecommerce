import Joi from "joi";

export function assertValid<T>(validator: Joi.ObjectSchema<T>, input: unknown): T {
  const validate = validator.validate(input);
  if (validate.error) throw validate.error;
  return validate.value as T;
}
