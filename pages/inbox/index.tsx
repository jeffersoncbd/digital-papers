import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { getItems, addItem } from '../../services/localStorage'

import List from '../../components/List'
import Input from '../../components/Input'

import { Container } from '../../styles/pages/inbox'

import { Item } from '../api/items'

const Inbox: React.FC = () => {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState<Item[]>([])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!(newItem === '' || newItem === undefined)) {
      try {
        const id = await addItem(newItem)
        setItems([...items, { id, title: newItem }])
        setNewItem('')
      } catch (error) {
        console.log(error)
        toast.error('Erro ao tentar adicionar item')
      }
    }
  }

  useEffect(() => {
    getItems().then((items) => {
      setItems(items)
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
          secondary: item.dueDate
            ? item.dueDate.split('-').reverse().join('/')
            : '',
          href: '/items/[id]',
          as: `/items/${item.id}`
        }))}
      />
    </Container>
  )
}

export default Inbox
