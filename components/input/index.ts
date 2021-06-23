import Input from './input'
import Textarea from '../textarea'
import InputPassword from './password'

export type InputComponentType = typeof Input & {
  Textarea: typeof Textarea
  Password: typeof InputPassword
}
;(Input as InputComponentType).Textarea = Textarea
;(Input as InputComponentType).Password = InputPassword

export type { InputProps } from './input'
export type { InputTypes } from './input-props'
export type { InputPasswordProps } from './password'
export type { TextareaProps } from '../textarea/textarea'
export type { BindingsChangeTarget } from './use-input'
export default Input as InputComponentType
