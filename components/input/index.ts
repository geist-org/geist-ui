import Input from './input'
import Textarea from '../textarea'
import InputPassword from './password'
import useImperativeInput from './use-imperative-input'

Input.Textarea = Textarea
Input.Password = InputPassword
Input.useImperativeInput = useImperativeInput

export { useImperativeInput }
export default Input
