const swaggerToOpenApi = require('swagger2openapi')
const openapiToPostman = require('openapi-to-postmanv2')
import { promises as fs } from 'fs'
import { promisify } from 'util'

const toPostman = promisify(openapiToPostman.convert)
const toOpenApi = promisify(swaggerToOpenApi.convertObj)

export const convertSwaggerToCollection = async (filePath: string) => {
  const swaggerJson = await fs.readFile(filePath, 'utf8')
  const swagger = JSON.parse(swaggerJson)
  const { openapi } = await toOpenApi(swagger, {})
  const data = {
    type: 'json',
    data: openapi,
  }
  const options = {
    // Group by tags over paths
    folderStrategy: 'tags',
  }
  const conversionResult = await toPostman(data, options)
  if (!conversionResult.result) {
    throw new Error(conversionResult.reason)
  }
  return conversionResult.output[0].data
}
