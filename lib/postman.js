'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Postman = void 0
const axios_1 = require('axios')
class Postman {
  constructor(apiKey) {
    this.axiosInstance = axios_1.default.create({
      baseURL: 'https://api.getpostman.com',
      headers: {
        'x-api-key': apiKey,
      },
    })
  }
  async updateSchema(swaggerJson, apiId, apiVersionId, schemaId) {
    try {
      const schemaPayload = JSON.stringify(swaggerJson)
      const response = await this.axiosInstance.put(
        `/apis/${apiId}/versions/${apiVersionId}/schemas/${schemaId}`,
        {
          schema: {
            language: 'json',
            schema: schemaPayload,
            type: 'openapi2',
          },
        }
      )
      console.debug(`${response.status}: Updated Postman API Schema`)
    } catch (error) {
      console.error('Failed to update Postman API Schema')
      throw error
    }
  }
  async getCollection(collectionUid) {
    try {
      const response = await this.axiosInstance.get(
        `/collections/${collectionUid}`
      )
      console.debug(`${response.status}: Retrieved Collection ${collectionUid}`)
      return {
        info: response.data.collection.info,
        item: response.data.collection.item,
        variable: response.data.collection.variable,
      }
    } catch (error) {
      console.error(`Failed to retrieve Collection ${collectionUid}`)
      throw error
    }
  }
  async deleteGeneratedCollection(collectionUid) {
    try {
      const response = await this.axiosInstance.delete(
        `/collections/${collectionUid}`
      )
      console.debug(`${response.status}: Deleted Collection ${collectionUid}`)
    } catch (error) {
      console.error(`Failed to delete Collection ${collectionUid}`)
      throw error
    }
  }
  async updateCollection(collectionUid, collection) {
    try {
      const response = await this.axiosInstance.put(
        `/collections/${collectionUid}`,
        { collection }
      )
      console.debug(`${response.status}: Updated Collection ${collectionUid}`)
    } catch (error) {
      console.error(`Failed to update Collection ${collectionUid}`)
      throw error
    }
  }
  async createCollection(collection) {
    try {
      const response = await this.axiosInstance.post(`/collections`, {
        collection,
      })
      console.debug(`${response.status}: Created Collection`)
      return response.data.collection.uid
    } catch (error) {
      console.error(`Failed to Create Collection`)
      throw error
    }
  }
}
exports.Postman = Postman
