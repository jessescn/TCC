import {
  Control,
  ControllerFieldState,
  ControllerProps,
  FieldValues,
  FormState,
  UseFormReturn,
  UseFormStateReturn
} from 'react-hook-form'

type FormControllerMockProps = ControllerProps & {
  onChangeSpy?: () => void
  validateValue?: any
  validateSpy?: (value: any) => void
}

export const FormControllerMock = (props: FormControllerMockProps) => {
  if (typeof props.rules?.validate === 'function') {
    const result = props.rules.validate(props.validateValue)

    if (props.validateSpy) {
      props.validateSpy(result)
    }
  }

  return (
    <>
      {props.render({
        field: {
          onChange: props.onChangeSpy || jest.fn(),
          name: props.name,
          onBlur: jest.fn(),
          value: null,
          ref: jest.fn()
        },
        fieldState: {} as ControllerFieldState,
        formState: {} as UseFormStateReturn<FieldValues>
      })}
    </>
  )
}

export const useFormContextMock = {
  control: {} as Control<FieldValues>,
  formState: { errors: {} } as FormState<FieldValues>,
  watch: jest.fn(),
  clearErrors: jest.fn(),
  getValues: jest.fn(),
  getFieldState: jest.fn(),
  handleSubmit: jest.fn(),
  register: jest.fn(),
  setError: jest.fn(),
  reset: jest.fn(),
  resetField: jest.fn(),
  setFocus: jest.fn(),
  setValue: jest.fn(),
  trigger: jest.fn(),
  unregister: jest.fn()
}

export const useFieldArrayMock = {
  append: jest.fn(),
  insert: jest.fn(),
  move: jest.fn(),
  remove: jest.fn(),
  replace: jest.fn(),
  swap: jest.fn(),
  update: jest.fn(),
  prepend: jest.fn(),
  fields: []
}

export const useFormMock: UseFormReturn = {
  clearErrors: jest.fn(),
  control: {} as Control<FieldValues>,
  formState: {} as FormState<FieldValues>,
  getFieldState: jest.fn(),
  getValues: jest.fn(),
  handleSubmit: jest.fn(),
  register: jest.fn(),
  reset: jest.fn(),
  resetField: jest.fn(),
  setError: jest.fn(),
  setFocus: jest.fn(),
  setValue: jest.fn(),
  trigger: jest.fn(),
  unregister: jest.fn(),
  watch: jest.fn()
}
