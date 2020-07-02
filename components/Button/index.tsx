import { Button, ButtonForIcons } from './styles'

import { ButtonInterface } from './types'

const ButtonWrapper: React.FC<ButtonInterface> = (props) => {
  const variants = {
    icon: ButtonForIcons
  }

  const ButtonVariant = variants[props.variant]

  if (ButtonVariant) {
    return <ButtonVariant {...props} />
  }

  return <Button {...props} />
}

export default ButtonWrapper
