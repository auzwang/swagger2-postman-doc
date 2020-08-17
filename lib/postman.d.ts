import { AxiosInstance } from 'axios'
interface Collection {
  info: any
  item: any
  variable: any
}
export declare class Postman {
  axiosInstance: AxiosInstance
  constructor(apiKey: string)
  updateSchema(
    swaggerJson: string,
    apiId: string,
    apiVersionId: string,
    schemaId: string
  ): Promise<void>
  getCollection(collectionUid: string): Promise<Collection>
  deleteGeneratedCollection(collectionUid: string): Promise<void>
  updateCollection(collectionUid: string, collection: Collection): Promise<void>
  createCollection(collection: any): Promise<string>
}
export {}
