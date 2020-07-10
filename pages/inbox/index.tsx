import { useState } from 'react'
import useSWR, { mutate } from 'swr'

import fetcher from '../../services/fetcher'
import api from '../../services/api'

import List from '../../components/List'
import Input from '../../components/Input'

import { Container } from '../../styles/pages/inbox'

import { Item } from '../api/items'

const Inbox: React.FC = () => {
  const [newItem, setNewItem] = useState('')

  const { data: items } = useSWR<Item[]>('/items', fetcher)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!(newItem === '' || newItem === undefined)) {
      const response = await api.post('/items', { title: newItem })
      const id = response.data.id

      items.push({ id, title: newItem })

      mutate('/api/items', items, false)
      mutate(`/api/items/${id}`, { id, title: newItem })
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

      {items && (
        <List
          items={items.map((item) => ({
            key: item.id,
            primary: item.title,
            secondary: item.dueDate
              ? item.dueDate.split('T')[0].split('-').reverse().join('/')
              : '',
            href: '/items/[id]',
            as: `/items/${item.id}`
          }))}
        />
      )}
    </Container>
  )
}

export default Inbox
