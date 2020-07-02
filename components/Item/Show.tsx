import Router from 'next/router'

import Button from '../../components/Button'
import Close from '../../assets/close.svg'
import Edit from '../../assets/edit.svg'

import {
  Container,
  Title,
  DueDate,
  SupportingText,
  Actions,
  Scroll
} from './styles'

import { Item } from '../../pages/api/items'

interface EditInterface {
  item: Item
  edit: () => void
}

const Show: React.FC<EditInterface> = ({ item, edit }) => (
  <Container>
    <Title>{item.title}</Title>
    <DueDate>{item.dueDate && item.dueDate.toString()}</DueDate>
    <Scroll>
      <SupportingText>{item.supportingText || 'Descrições'}</SupportingText>
    </Scroll>
    <Actions>
      <Button variant="icon" onClick={() => Router.back()}>
        <Close width={35} height={35} />
      </Button>
      <Button variant="icon" onClick={edit}>
        <Edit width={35} height={35} />
      </Button>
    </Actions>
  </Container>
)

export default Show
