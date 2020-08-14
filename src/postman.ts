import axios, { AxiosInstance } from 'axios'

interface Collection {
  info: any
  item: any
  variable: any
}

export class Postman {
  axiosInstance: AxiosInstance

  constructor(apiKey: string) {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.getpostman.com',
      headers: {
        'x-api-key': apiKey,
      },
    })
  }

  async updateSchema(
    swaggerJson: string,
    apiId: string,
    apiVersionId: string,
    schemaId: string
  ): Promise<void> {
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

  async getCollection(collectionUid: string): Promise<Collection> {
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

  async deleteGeneratedCollection(collectionUid: string): Promise<void> {
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

  async updateCollection(
    collectionUid: string,
    collection: Collection
  ): Promise<void> {
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

  async createCollection(collection: any): Promise<string> {
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
