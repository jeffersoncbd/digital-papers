import { Input } from './styles'
import { InputHTMLAttributes } from 'react'

const InputWrapper: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <Input {...props} />
}

export default InputWrapper
