import InterceptorManager from './interceptorManager'
import { request } from './wxApi'

class Requests {
  constructor(instanceConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
    this._genShortcuts()
  }

  request(config) {
    if (typeof config === 'string') {
      config = arguments[1] || {}
      config.url = arguments[0]
    } else {
      config = config || {}
    }

    if (this.defaults.baseURL) {
      config.url = config.url
        ? this.defaults.baseURL.replace(/\/+$/, '') +
          '/' +
          config.url.replace(/^\/+/, '')
        : this.defaults.baseURL
    }

    config = Object.assign({}, this.defaults, config)
    config.method = config.method ? config.method.toUpperCase() : 'GET'

    const chain = [request, undefined]
    let promise = Promise.resolve(config)

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    while (chain.length) {
      // 链式调用
      promise = promise.then(chain.shift(), chain.shift()) // fulfill 和 reject 需要成对出现
    }

    return promise
  }

  _forEachMethod(method) {
    return (url, config) => {
      return this.request(Object.assign(config || {}, { method, url }))
    }
  }

  _genShortcuts() {
    ['delete', 'head', 'get', 'options', 'post', 'put'].forEach(method => {
      this[method] = this._forEachMethod(method)
    })
  }
}

module.exports = Requests
