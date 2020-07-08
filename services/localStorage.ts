import api from './api'

import { Item } from '../pages/api/items'

export const getItems = async () => {
  const localItems = localStorage.getItem('items')
  sessionStorage.clear()

  if (!localItems) {
    const response = await api.get<Item[]>('/items')
    const items = response.data.map((item) => ({
      ...item,
      dueDate: item.dueDate && item.dueDate.split('T')[0]
    }))
    localStorage.setItem('items', JSON.stringify(items))
    return items
  }

  return JSON.parse(localItems) as Item[]
}

export const getItem = async (id: string) => {
  let localItem = localStorage.getItem(`item-${id}`)

  if (!localItem) {
    localItem = sessionStorage.getItem(`item-${id}`)
  }
  if (!localItem) {
    const response = await api.get<Item>(`/items/${id}`)
    const item = response.data
    item.dueDate = item.dueDate && item.dueDate.split('T')[0]

    localStorage.setItem(`item-${id}`, JSON.stringify(item))

    return item
  }

  const parsedItem = JSON.parse(localItem)

  const item: Item = {
    id: parsedItem.id,
    title: parsedItem.title,
    dueDate: parsedItem.dueDate,
    supportingText: parsedItem.supportingText
  }

  return item
}

export const addItem = (titleOfNewItem: string) => {
  const temporaryId = Number(new Date())

  sessionStorage.setItem(
    `item-${temporaryId}`,
    JSON.stringify({
      id: temporaryId,
      title: titleOfNewItem
    })
  )

  async function syncWithAPI() {
    const response = await api.post('/items', { title: titleOfNewItem })

    const item: Item = {
      id: response.data.id,
      title: titleOfNewItem
    }

    const items = await getItems()
    items.push(item)
    localStorage.setItem('items', JSON.stringify(items))

    localStorage.setItem(`item-${response.data.id}`, JSON.stringify(item))

    sessionStorage.setItem(
      `item-${temporaryId}`,
      JSON.stringify({
        id: temporaryId,
        title: titleOfNewItem,
        hasID: true,
        newId: response.data.id
      })
    )
  }

  syncWithAPI()

  return temporaryId
}

export const updateItem = (item: Item) => {
  const temporaryItem = JSON.parse(sessionStorage.getItem(`item-${item.id}`))
  if (temporaryItem && temporaryItem.hasID) {
    item.id = temporaryItem.newId
  }

  localStorage.setItem(`item-${item.id}`, JSON.stringify(item))

  async function syncWithAPI() {
    await api.put(`/items/${item.id}`, item)

    let items = await getItems()
    items = items.map((storageItem) => {
      if (storageItem.id === item.id) {
        return item
      }
      return storageItem
    })
    localStorage.setItem('items', JSON.stringify(items))
  }

  syncWithAPI()
}

export const deleteItem = async (itemId: number) => {
  let items = await getItems()
  items = items.filter((item) => itemId !== item.id)
  localStorage.setItem('items', JSON.stringify(items))
  localStorage.removeItem(`item-${itemId}`)

  async function syncWithAPI() {
    await api.delete(`/items/${itemId}`)
  }

  syncWithAPI()
}
