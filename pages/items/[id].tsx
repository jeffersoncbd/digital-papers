/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import TextareaAutosize from 'react-autosize-textarea'

import { getItem, updateItem, deleteItem } from '../../services/localStorage'

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

  const [sync, setSync] = useState<{ edited: boolean; timer: null | number }>({
    edited: false,
    timer: null
  })

  const [item, setItem] = useState<Item>({
    id: 0,
    dueDate: null,
    title: '',
    supportingText: ''
  })

  useEffect(() => {
    // RECUPERAR ITEM
    if (router.query.id) {
      getItem(router.query.id as string).then((item) => {
        setItem(item)
      })
    }
  }, [router.query.id])

  useEffect(() => {
    // ATUALIZAR ITEM
    if (sync.timer === 0) {
      const timer = setTimeout(() => {
        updateItem(item)
      }, 2000)
      setSync({ edited: false, timer })
    }
  }, [sync.timer])

  useEffect(() => {
    // RESETAR INTERVALO
    if (sync.edited) {
      clearTimeout(sync.timer)
      setSync({ edited: false, timer: 0 })
    }
  }, [sync.edited])

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) {
    setSync({ ...sync, edited: true })
    const { name, value } = event.target as HTMLInputElement
    setItem({ ...item, [name]: value })
  }

  async function handleDeleteItem() {
    await deleteItem(item.id)
    Router.back()
  }

  return (
    <Container>
      <InputTitle
        name="title"
        value={item.title}
        onChange={handleInputChange}
        placeholder="Título"
      />
      <InputDueDate
        type="date"
        name="dueDate"
        value={item.dueDate ? item.dueDate.toString() : ''}
        onChange={handleInputChange}
        placeholder="Vencimento"
      />
      <Scroll>
        <TextareaAutosize
          name="supportingText"
          value={item.supportingText ? item.supportingText : ''}
          onChange={handleInputChange}
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
