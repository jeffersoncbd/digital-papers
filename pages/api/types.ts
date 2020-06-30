import { NextApiRequest, NextApiResponse } from 'next'

export interface RequestHandler<T> {
  (request: NextApiRequest, response: NextApiResponse<T>): Promise<void>
}
