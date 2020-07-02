import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import api from '../../services/api'

import ShowItem from '../../components/Item/Show'
// import EditItem from '../../components/Item/Edit'

import { Item } from '../api/items'

const ItemWrapper: React.FC = () => {
  const router = useRouter()

  const [item, setItem] = useState<Item>({
    id: 0,
    dueDate: null,
    title: '',
    supportingText: ''
  })
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    api
      .get(`/items/${router.query.id}`)
      .then((response) => {
        setItem(response.data)
      })
      .catch((error) => {
        console.log(error)
        Router.back()
      })
  }, [router.query.id])

  // <EditItem item={item} cancelEdit={() => setEdit(false)} />
  return edit ? (
    <h1>Edit</h1>
  ) : (
    <ShowItem item={item} edit={() => setEdit(true)} />
  )
}

export default ItemWrapper
