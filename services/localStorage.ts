import api from './api'

import { Item } from '../pages/api/items'

export const getItems = async () => {
  const localItems = localStorage.getItem('items')

  if (!localItems) {
    const response = await api.get<Item[]>('/items')
    localStorage.setItem('items', JSON.stringify(response.data))
    return response.data
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
    return response.data
  }

  return JSON.parse(localItem) as Item
}

export const addItem = (newItem: string) => {
  const item: Item = {
    id: Number(new Date()),
    title: newItem
  }

  sessionStorage.setItem(`item-${item.id}`, JSON.stringify(item))

  async function syncWithAPI() {
    const response = await api.post('/items', { title: item.title })

    item.id = response.data.id
    const items = await getItems()
    items.push(item)
    localStorage.setItem('items', JSON.stringify(items))

    localStorage.setItem(`item-${response.data.id}`, JSON.stringify(item))
  }

  syncWithAPI()

  return item.id
}

export const updateItem = (item: Item) => {
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

  async function syncWithAPI() {
    await api.delete(`/items/${itemId}`)
  }

  syncWithAPI()
}
