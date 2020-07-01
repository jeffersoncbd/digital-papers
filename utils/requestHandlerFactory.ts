import { NextApiRequest, NextApiResponse } from 'next'

interface RequestHandler {
  (request: NextApiRequest, response: NextApiResponse): void | Promise<void>
}

export interface Methods {
  GET?: RequestHandler
  POST?: RequestHandler
  PUT?: RequestHandler
  DELETE?: RequestHandler
  PATCH?: RequestHandler
}

function requestHandlerFactory(methods: Methods) {
  const acceptedMethods: string[] = []

  for (const method in methods) {
    acceptedMethods.push(method)
  }

  async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (!acceptedMethods.includes(request.method)) {
      response.setHeader('Allow', acceptedMethods)
      response.status(405).end(`Method ${request.method} Not Allowed`)
      return
    }

    methods[request.method](request, response)
  }

  return handler
}

export default requestHandlerFactory
