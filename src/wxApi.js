const promisify = wxApi => {
  return (options, ...params) =>
    new Promise((resolve, reject) => {
      wxApi({ ...options, success: resolve, fail: reject }, ...params)
    })
}

const promisedApis = {}

Object.keys(wx).forEach(key => {
  if (key.substr(0, 2) === 'on' || /Sync$/.test(key)) {
    Object.defineProperty(promisedApis, key, {
      get() {
        return wx[key]
      }
    })
  } else {
    Object.defineProperty(promisedApis, key, {
      get() {
        return promisify(wx[key])
      }
    })
  }
})

module.exports = promisedApis
