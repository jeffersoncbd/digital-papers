import { v4 as uuid } from 'uuid'

abstract class Item {
  title: string
  dueDate?: string
  supportingText?: string
}

interface ItemEntityData extends Item {
  id?: string
}

export class ItemEntity extends Item {
  readonly id: string

  constructor(data: ItemEntityData) {
    super()
    if (!data.id) {
      data.id = uuid()
    }
    Object.assign(this, data)
  }
}
