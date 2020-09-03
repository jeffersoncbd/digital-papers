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
    let local = request.query.local as undefined | string
    local = local || null

    const items = await prisma.item.findMany({ where: { local } })

    response.json(items)
  },

  POST: async (request, response) => {
    const { id, title } = request.body

    const item = await prisma.item.create({
      data: { id, title }
    })

    response.json({ id: item.id })
  }
})
