const converter = require('openapi-to-postmanv2')
import { promises as fs } from 'fs'

export const convertSwaggerToCollection = async (filePath: string) => {
  const swaggerJson = await fs.readFile(filePath, 'utf8')
  // Converter requires semver specified as an `openapi` property.
  const swagger = JSON.parse(swaggerJson)
  swagger.openapi = '2.0.0'
  const data = {
    type: 'json',
    data: swagger,
  }
  const options = {
    // Group by tags over paths
    folderStrategy: 'tags',
  }
  return new Promise((resolve, reject) => {
    converter.convert(data, options, (error: Error, conversionResult: any) => {
      if (error) {
        return reject(error)
      }
      if (!conversionResult.result) {
        return reject(conversionResult.reason)
      }
      return resolve(conversionResult.output[0].data)
    })
  })
}
