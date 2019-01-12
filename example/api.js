import http from './http'

const login = data => http.get('/login', { data })

const updateUser = data => http.post('/updateUser', { data })
