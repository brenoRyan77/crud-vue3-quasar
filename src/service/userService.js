import { api } from 'src/boot/axios'
const baseURL = '/users'
class UserService {
  getUsers () {
    return api.get(baseURL)
  }

  getById (id) {
    return api.get(`${baseURL}/${id}`)
  }

  saveUser (user) {
    return api.post(baseURL, user)
  }

  updateUser (id, user) {
    return api.put(`${baseURL}/${id}`, user)
  }

  deleteUser (id) {
    return api.delete(`${baseURL}/${id}`)
  }
}

export const userService = new UserService()
