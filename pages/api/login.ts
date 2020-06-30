import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { PageConfig } from 'next'

import { RequestHandler } from './types'

interface ResponseData {
  feedback?: string
  token?: string
}

const loginRequest: RequestHandler<ResponseData> = async (
  request,
  response
) => {
  const { method, body } = request

  async function verifyPassword() {
    const prisma = new PrismaClient()
    const configuration = await prisma.configurations.findOne({
      where: { id: 1 }
    })

    response.statusCode = 400
    if (configuration === null) {
      response.json({
        feedback: 'Servidor não foi configurado, leia a documentação'
      })
    }
    if (body.password !== configuration.hashLogin) {
      response.json({
        feedback: 'Senha incorreta',
        token: configuration.hashLogin
      })
    }

    const token = jwt.sign('Digital Papers', process.env.APP_SECRET)
    response.statusCode = 200
    response.json({ token, feedback: 'Logado com sucesso!' })
  }

  switch (method) {
    case 'POST':
      await verifyPassword()
      break

    default:
      response.setHeader('Allow', ['POST'])
      response.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

export default loginRequest
