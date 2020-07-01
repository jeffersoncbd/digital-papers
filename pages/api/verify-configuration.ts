import { PrismaClient } from '@prisma/client'
import { PageConfig } from 'next'
import crypto from 'crypto'

import requestHandlerFactory from '../../utils/requestHandlerFactory'

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

export default requestHandlerFactory({
  GET: async (request, response) => {
    const prisma = new PrismaClient()

    const configuration = await prisma.configurations.findOne({
      where: { id: 1 }
    })

    if (configuration === null) {
      const hash = crypto.randomBytes(20).toString('hex')

      await prisma.configurations.create({ data: { hashLogin: hash } })

      response.statusCode = 200
      response.json({ done: false, hash })
      return
    }

    console.log(configuration.hashLogin)

    response.statusCode = 200
    response.json({ done: true })
  }
})
