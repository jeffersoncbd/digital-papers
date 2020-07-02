import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import api from '../../services/api'

import List from '../../components/List'
import Input from '../../components/Input'

import { Container } from '../../styles/pages/inbox'

interface Item {
  id: number
  title: string
  dueDate?: string
  supportingText: string
}

const Inbox: React.FC = () => {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState<Item[]>([])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!(newItem === '' || newItem === undefined)) {
      try {
        const response = await api.post('/items', { title: newItem })
        setItems([
          ...items,
          {
            id: Number(response.data.itemId),
            title: newItem,
            supportingText: ''
          }
        ])
        setNewItem('')
      } catch (error) {
        console.log(error)
        toast.error('Erro ao tentar adicionar item')
      }
    }
  }

  useEffect(() => {
    api.get('/items').then((response) => {
      setItems(response.data)
    })
  }, [])

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
          href: '/items/[id]',
          as: `/items/${item.id}`
        }))}
      />
    </Container>
  )
}

export default Inbox
