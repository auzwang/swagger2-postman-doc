'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.convertSwaggerToCollection = void 0
const converter = require('openapi-to-postmanv2')
const fs_1 = require('fs')
exports.convertSwaggerToCollection = async (filePath) => {
  const swaggerJson = await fs_1.promises.readFile(filePath, 'utf8')
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
    converter.convert(data, options, (error, conversionResult) => {
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
