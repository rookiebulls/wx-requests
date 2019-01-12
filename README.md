# wx-requests

Lightweight promise based HTTP client for wechat miniprogram

# Example

A GET request

```
import http from 'wx-requests/src/index'

http.get('/user', {
  data: {
    userId: 10000
  }
})
  .then((resp) => {
    console.log(resp)
  })
  .catch((err) => {
    console.error(err)
  })

// async await
const getUser = data => http.get('/user', { data })

try {
  const resp = await getUser({ userId: 10000 })
  console.log(resp)
} catch (e) {
  console.error(e)
}

```

A POST request

```
import http from 'wx-requests/src/index'

http.post('/login', {
  data: {
    name: 'rookiebulls',
    password: 'xxxxxxx'
  }
})
  .then((resp) => {
    console.log(resp)
  })
  .catch((err) => {
    console.error(err)
  })

// async await
const login = data => http.post('/login', { data })

try {
  const resp = await login({ name: 'rookiebulls', password: 'xxxxxxx' })
  console.log(resp)
} catch (e) {
  console.error(e)
}

```

# Interceptors

```
import http from 'wx-requests/src/index'

http.defaults.baseURL = 'https://xxxx.com/api'

// request interceptor
http.interceptors.request.use(
  config => {
    wx.showNavigationBarLoading()
    // do something with your config
    config.header['Authorization'] = 'your-token-here'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    wx.hideNavigationBarLoading()
    const resp = response.data
    // handle response here
    return resp
  },
  error => {
    wx.hideNavigationBarLoading()
    // handle your errors here
    if (error.errMsg.startsWith('request:fail ')) {
      wx.showToast({
        title: 'Bad network, please try again.',
        duration: 3000
      })
    }
    return Promise.reject(error)
  }
)

module.exports = http

```

# License

MIT
