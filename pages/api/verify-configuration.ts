import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { PageConfig } from 'next'

import { RequestHandler } from './types'

interface ResponseData {
  done: boolean
  hash?: string
}

const verifyConfigurationRequest: RequestHandler<ResponseData> = async (
  request,
  response
) => {
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

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

export default verifyConfigurationRequest
