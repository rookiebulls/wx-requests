import http from '../src/index'

http.defaults.baseURL = 'https://xxxx.com/api'

http.interceptors.request.use(
  config => {
    wx.showNavigationBarLoading()
    // do something with your config
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
