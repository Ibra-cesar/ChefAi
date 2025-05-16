/* eslint-disable @typescript-eslint/no-explicit-any */
type ValidationResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

type ValidationValue<T> = {
  value: T;
};

export class ValidationType<T extends string | number | object, Output = T> {
  protected validators: ((value: ValidationValue<T>) => string | null)[] = [];
  protected transformator?: (value: T) => Output;

  parse(value: ValidationValue<T>): ValidationResult<Output> {
    for (const validate of this.validators) {
      const error = validate(value);
      if (error) {
        return { success: false, error };
      }
    }
    const transformed = this.transformator
      ? this.transformator(value.value as T)
      : value.value;
    return { success: true, data: transformed as Output };
  }

  protected addValidators(
    validator: (value: ValidationValue<T>) => string | null
  ): this {
    this.validators.push(validator);
    return this;
  }
  transform<NewOutput>(fn: (value: T) => NewOutput): ValidationType<T, NewOutput> {
    const instance = new ValidationType<T, NewOutput>();
    instance.validators = this.validators;
    instance.transformator = fn;
    return instance;
  }
}

export class FormString extends ValidationType<string> {
  constructor() {
    super();
    this.addValidators((value) =>
      typeof value.value === "string" ? null : "Expected String."
    );
  }

  min(length: number): this {
    return this.addValidators((value) =>
      value.value.length >= length
        ? null
        : `Must be at least ${length} of characters!`
    );
  }
  max(length: number): this {
    return this.addValidators((value) =>
      value.value.length <= length
        ? null
        : `Must be at most ${length} of characters!`
    );
  }
  nonNumber(): this {
    return this.addValidators((value) =>
      !/^\d+(\.\d+)?$/.test(value.value.trim())
        ? null
        : "Expected result 'e.g. 1 items' not '123' or '1.2.3'"
    );
  }
}

export class FormNumber extends ValidationType<number> {
  constructor() {
    super();
    this.addValidators((value) =>
      typeof value.value === "number" ? null : "Expected Number."
    );
  }

  min(minVal: number): this {
    return this.addValidators((value) =>
      value.value >= minVal ? null : `Must be at least ${minVal}!`
    );
  }
  max(maxVal: number): this {
    return this.addValidators((value) =>
      value.value <= maxVal ? null : `Must be at most ${maxVal}!`
    );
  }
}

export type Infer<T> = T extends ValidationType<infer U> ? U : never;

export class FormObject<
  T extends { [key: string]: ValidationType<any> }
> extends ValidationType<{
  [K in keyof T]: Infer<T[K]>;
}> {
  private shape: T;

  constructor(shape: T) {
    super();
    this.shape = shape;
  }
  parse(
    value: ValidationValue<{ [K in keyof T]: Infer<T[K]> }>
  ): ValidationResult<{
    [K in keyof T]: Infer<T[K]>;
  }> {
    const result: Partial<{ [K in keyof T]: Infer<T[K]> }> = {};
    const inputValue = value.value;

    for (const key in this.shape) {
      const schema = this.shape[key];
      const fieldValue = inputValue[key];

      const parsed = schema.parse({ value: fieldValue });

      if (!parsed.success) {
        return {
          success: false,
          error: `Invalid field "${key}": ${parsed.error}`,
        };
      }

      result[key as keyof T] = parsed.data as Infer<T[typeof key]>;
    }

    return { success: true, data: result as { [K in keyof T]: Infer<T[K]> } };
  }
}

export const form = {
  string: () => new FormString(),
  number: () => new FormNumber(),
  object: <T extends { [key: string]: ValidationType<any> }>(shape: T) =>
    new FormObject(shape),
};
