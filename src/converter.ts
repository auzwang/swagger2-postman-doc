const swaggerToOpenApi = require('swagger2openapi')
const openapiToPostman = require('@localz/openapi-to-postmanv2')
import { promises as fs } from 'fs'
import { promisify } from 'util'

const toPostman = promisify(openapiToPostman.convert)
const toOpenApi = promisify(swaggerToOpenApi.convertObj)

export type FolderStrategy = 'paths' | 'tags'
export type RequestParametersResolution = 'schema' | 'example'
export type ExampleParametersResolution = 'schema' | 'example'

export interface PostmanConverterOptions {
  folderStrategy?: FolderStrategy
  requestParametersResolution?: RequestParametersResolution
  exampleParametersResolution?: ExampleParametersResolution
  schemaFaker?: boolean
  collapseFolders?: boolean
}

const defaultToPostmanOptions = {
  // Group by tags over paths
  folderStrategy: 'tags' as FolderStrategy,
  requestParametersResolution: 'schema' as RequestParametersResolution,
  exampleParametersResolution: 'example' as ExampleParametersResolution,
  schemaFaker: true,
  collapseFolders: true,
}

export const convertSwaggerToCollection = async (
  filePath: string,
  toPostmanOptions: PostmanConverterOptions = defaultToPostmanOptions
) => {
  const swaggerJson = await fs.readFile(filePath, 'utf8')
  const swagger = JSON.parse(swaggerJson)
  const { openapi } = await toOpenApi(swagger, {})
  const data = {
    type: 'json',
    data: openapi,
  }
  const options = { ...defaultToPostmanOptions, ...toPostmanOptions }
  console.debug('Converting to Postman with options:', options)
  const conversionResult = await toPostman(data, options)
  if (!conversionResult.result) {
    throw new Error(conversionResult.reason)
  }
  return conversionResult.output[0].data
}
