import http from './http'

const getUser = data => http.get('/getUser', { data })

const updateUser = data => http.post('/updateUser', { data })

module.exports = {
  getUser,
  updateUser
}
