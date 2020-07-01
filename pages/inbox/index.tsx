import { useState } from 'react'
import Router from 'next/router'

import List from '../../components/List'
import Input from '../../components/Input'

import { Container } from '../../styles/pages/inbox'

const Inbox: React.FC = () => {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!(newItem === '' || newItem === undefined)) {
      setNewItem('')
    }
  }

  return (
    <Container>
      <h1>Caixa de entrada</h1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Adicionar novo"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
      </form>
      <List
        items={items.map((item) => ({
          key: item.id,
          primary: item.title,
          secondary: item.dueDate,
          onClick: () => Router.push(`/inbox/${item.id}`)
        }))}
      />
    </Container>
  )
}

export default Inbox
