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

    const {
      query: { id }
    } = request

    if (isNaN(Number(id))) {
      response.statusCode = 400
      response.send('')
      return
    }

    const item = await prisma.item.findOne({ where: { id: Number(id) } })

    response.json(item)
  },

  DELETE: async (request, response) => {
    const prisma = new PrismaClient()

    const {
      query: { id }
    } = request

    if (isNaN(Number(id))) {
      response.statusCode = 400
      response.send('')
      return
    }

    await prisma.item.delete({ where: { id: Number(id) } })

    response.send('')
  }
})
