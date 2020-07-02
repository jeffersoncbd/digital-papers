import { PrismaClient, Item } from '@prisma/client'
import { PageConfig } from 'next'

import requestHandlerFactory from '../../../utils/requestHandlerFactory'

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

export type { Item }

export default requestHandlerFactory({
  GET: async (request, response) => {
    const prisma = new PrismaClient()

    const items = await prisma.item.findMany()

    response.json(items)
  },

  POST: async (request, response) => {
    const prisma = new PrismaClient()

    await prisma.item.create({ data: { title: request.body.title as string } })

    response.send('')
  }
})
