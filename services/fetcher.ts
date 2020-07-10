import api from '../services/api'

export default async (url: string) => {
  const response = await api.get(url)
  return response.data
}
