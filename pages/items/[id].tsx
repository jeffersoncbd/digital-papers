import { useState, useCallback } from 'react'
import Router, { useRouter } from 'next/router'
import TextareaAutosize from 'react-autosize-textarea'
import useSWR from 'swr'

import fetcher from '../../services/fetcher'
import api from '../../services/api'

import {
  Container,
  InputTitle,
  InputDueDate,
  Actions,
  Scroll
} from '../../styles/pages/item'

import Button from '../../components/Button'
import Return from '../../assets/return.svg'
import Delete from '../../assets/delete.svg'

import { Item } from '../api/items'

const ItemWrapper: React.FC = () => {
  const router = useRouter()

  const { data: item, mutate: mutateItem } = useSWR<Item>(
    `/items/${router.query.id}`,
    fetcher
  )

  const { data: items, mutate: mutateItems } = useSWR<Item[]>('/items', fetcher)

  const [timer, setTimer] = useState<null | number>(null)

  const handleNameChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.FormEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target as HTMLInputElement
      const updatedItem = { ...item, [name]: value }

      mutateItem(updatedItem, false)

      if (timer !== null) {
        clearTimeout(timer)
        setTimer(null)
      }

      mutateItems(
        items.map((listItem) => {
          if (listItem.id === updatedItem.id) {
            return updatedItem
          }
          return listItem
        }),
        false
      )

      async function update() {
        await api.put(`/items/${item.id}`, updatedItem)
        console.log('Atualizado')
      }

      const timerId = setTimeout(() => update(), 1000)
      setTimer(timerId)
    },
    [item, items, mutateItem, mutateItems, timer]
  )

  async function handleDeleteItem() {
    api.delete(`/items/${item.id}`)

    await mutateItems(
      items.filter((listItem) => listItem.id !== item.id),
      false
    )

    Router.back()
  }

  if (!item) {
    return <Container>Carregando...</Container>
  }

  return (
    <Container>
      <InputTitle
        name="title"
        value={item.title}
        onChange={handleNameChange}
        placeholder="Título"
      />
      <InputDueDate
        type="date"
        name="dueDate"
        value={item.dueDate ? item.dueDate.split('T')[0] : ''}
        onChange={handleNameChange}
        placeholder="Vencimento"
      />
      <Scroll>
        <TextareaAutosize
          name="supportingText"
          value={item.supportingText || ''}
          onChange={handleNameChange}
          placeholder="Descrições"
        />
      </Scroll>
      <Actions>
        <Button
          variant="icon"
          onClick={() => {
            Router.back()
          }}
        >
          <Return width={35} height={35} />
        </Button>
        <Button variant="icon" onClick={handleDeleteItem}>
          <Delete width={35} height={35} />
        </Button>
      </Actions>
    </Container>
  )
}

export default ItemWrapper
