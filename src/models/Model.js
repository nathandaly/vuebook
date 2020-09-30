import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  /**
   * @returns {string}
   */
  baseURL () {
    return `${process.env.API}/api`
  }

  /**
   * @param config
   * @returns {*}
   */
  request (config) {
    config.params = {
      ...config.params,
      ...{
        data: window.dataString
      }
    }

    return this.$http.request(config)
  }

  /**
   * @param model
   */
  applyMutations (model) {
    Object.keys(model.mutations || {}).forEach(propKey => {
      if (!model[propKey]) {
        return
      }

      const ModelForKey = model.mutations[propKey]

      if (Array.isArray(model[propKey])) {
        model[propKey].forEach((item, i) => {
          const modelData = model[propKey][i]
          model[propKey][i] = new ModelForKey(modelData)
          this.applyMutations(model[propKey][i])
        })
      } else {
        const modelData = model[propKey]
        model[propKey] = new ModelForKey(modelData)
        this.applyMutations(model[propKey])
      }
    })
  }

  /**
   * @returns {Promise<*>}
   */
  async save () {
    return super.save().then(model => {
      this.applyMutations(model)

      return model
    })
  }

  /**
   * @param id
   * @returns {Promise<*>}
   */
  async find (id) {
    return super.find(id).then(model => {
      this.applyMutations(model)

      return model
    })
  }

  /**
   * @returns {Promise<*>}
   */
  async get () {
    return super.get().then(models => {
      let iterable = models

      if (models && models.data) {
        iterable = models.data
      }

      iterable.forEach(model => {
        this.applyMutations(model)
      })

      return models
    })
  }
}
