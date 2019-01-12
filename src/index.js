import Requests from './requests'

const defaults = {
  header: {},
  method: 'GET',
  dataType: 'json',
  responseType: 'text'
}

function createInstance(defaultConfig) {
  const ctx = new Requests(defaultConfig)
  const instance = Requests.prototype.request.bind(ctx)
  Object.assign(instance, Requests.prototype, ctx)
  return instance
}

const request = createInstance(defaults)

request.create = function create(instanceConfig) {
  return createInstance(Object.assign({}, defaults, instanceConfig))
}

request.all = function all(promises) {
  return Promise.all(promises)
}

module.exports = request
