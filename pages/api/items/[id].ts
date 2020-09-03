import { PageConfig } from 'next'

import requestHandlerFactory from '../../../utils/requestHandlerFactory'
import { prisma } from '../../../database'

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

export default requestHandlerFactory({
  GET: async (request, response) => {
    const {
      query: { id }
    } = request

    const item = await prisma.item.findOne({ where: { id: id as string } })

    if (item === null) {
      response.statusCode = 400
      response.send('')
      return
    }

    response.json(item)
  },

  DELETE: async (request, response) => {
    const {
      query: { id }
    } = request

    await prisma.item.delete({ where: { id: id as string } })

    response.send('')
  },

  PUT: async (request, response) => {
    const {
      query: { id }
    } = request
    const body = request.body

    if (body.dueDate) {
      const dateArray = (body.dueDate as string)
        .split('T')[0]
        .split('-')
        .map((value, i) => (i === 1 ? Number(value) - 1 : Number(value)))

      body.dueDate = new Date(dateArray[0], dateArray[1], dateArray[2])
    }

    await prisma.item.update({ where: { id: id as string }, data: { ...body } })

    response.send('')
  }
})
