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
  },

  PUT: async (request, response) => {
    const prisma = new PrismaClient()

    const {
      query: { id }
    } = request
    const body = request.body

    if (isNaN(Number(id))) {
      response.statusCode = 400
      response.send('')
      return
    }

    if (body.dueDate) {
      const dateArray = (body.dueDate as string)
        .split('T')[0]
        .split('-')
        .map((value, i) => (i === 1 ? Number(value) - 1 : Number(value)))

      body.dueDate = new Date(dateArray[0], dateArray[1], dateArray[2])
    }

    await prisma.item.update({ where: { id: Number(id) }, data: { ...body } })

    response.send('')
  }
})
