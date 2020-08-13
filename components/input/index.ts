import Input, { useInputHandle } from './input'
import Textarea from '../textarea'
import InputPassword from './password'

Input.Textarea = Textarea
Input.Password = InputPassword
Input.useInputHandle = useInputHandle

export { useInputHandle }
export default Input
