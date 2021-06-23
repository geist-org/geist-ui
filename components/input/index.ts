import Input from './input'
import Textarea from '../textarea'
import InputPassword from './password'

export type InputComponentType = typeof Input & {
  Textarea: typeof Textarea
  Password: typeof InputPassword
}
;(Input as InputComponentType).Textarea = Textarea
;(Input as InputComponentType).Password = InputPassword

export default Input as InputComponentType
