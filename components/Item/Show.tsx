import React from 'react'
// import { MdClose, MdModeEdit } from 'react-icons/md'

// import Button from '../../components/Button'
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

const Show: React.FC<EditInterface> = ({ item }) => (
  <Container>
    <Title>{item.title}</Title>
    <DueDate>{item.dueDate && item.dueDate.toString()}</DueDate>
    <Scroll>
      <SupportingText>{item.supportingText || 'Descrições'}</SupportingText>
    </Scroll>
    <Actions></Actions>
  </Container>
)

/* ACTIONS
  <Button variant="icon" onClick={() => history.goBack()}>
    <MdClose size={25} />
  </Button>
  <Button variant="icon" onClick={() => edit()}>
    <MdModeEdit size={25} />
  </Button>
*/

export default Show
