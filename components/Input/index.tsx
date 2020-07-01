import { Input } from './styles'
import { InputHTMLAttributes } from 'react'

const InputWrapper: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => <Input {...props} />

export default InputWrapper
