import jwt from 'jsonwebtoken'
import { PageConfig } from 'next'

import requestHandlerFactory from '../../utils/requestHandlerFactory'
import { prisma } from '../../database'

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

export default requestHandlerFactory({
  POST: async (request, response) => {
    const configuration = await prisma.configurations.findOne({
      where: { id: 1 }
    })

    if (configuration === null) {
      response.statusCode = 400
      response.json({
        feedback: 'Servidor não foi configurado, leia a documentação'
      })
      return
    }
    if (request.body.password !== configuration.hashLogin) {
      response.statusCode = 400
      response.json({
        feedback: 'Senha incorreta'
      })
      return
    }

    const token = jwt.sign('Digital Papers', process.env.APP_SECRET)
    response.statusCode = 200
    response.json({ token, feedback: 'Autenticado com sucesso!' })
  }
})
