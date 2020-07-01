import { Button } from './styles'
import { ButtonHTMLAttributes } from 'react'

const ButtonWrapper: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => <Button {...props} />

export default ButtonWrapper
