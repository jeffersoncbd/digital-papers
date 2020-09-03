import { PrismaClient } from '@prisma/client'
import { PageConfig } from 'next'

import requestHandlerFactory from '../../../utils/requestHandlerFactory'

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

export default requestHandlerFactory({
  GET: async (request, response) => {
    const prisma = new PrismaClient()

    let local = request.query.local as undefined | string
    local = local || null

    const items = await prisma.item.findMany({ where: { local } })

    response.json(items)
  },

  POST: async (request, response) => {
    const prisma = new PrismaClient()

    const { id, title } = request.body

    const item = await prisma.item.create({
      data: { id, title }
    })

    response.json({ id: item.id })
  }
})
