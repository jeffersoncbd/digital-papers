import axios from 'axios'

const api = axios.create({
  baseURL: `/api/`
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message.includes('code 403')) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export default api
