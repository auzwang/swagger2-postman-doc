'use strict'
const command_1 = require('@oclif/command')
const postman_1 = require('./postman')
const converter_1 = require('./converter')
class Swagger2PostmanDoc extends command_1.Command {
  constructor() {
    super(...arguments)
    this.helpText = 'See more help with --help.'
  }
  async run() {
    const { args } = this.parse(Swagger2PostmanDoc)
    const postman = new postman_1.Postman(args.apiKey)
    let swaggerJson
    const file = `${process.cwd()}/${args.file}`
    try {
      swaggerJson = require(file || '')
    } catch (error) {
      return this.error(
        `Failed to require Swagger file: ${file}. ${this.helpText}`
      )
    }
    // Update the Postman API Schema based on swagger.json
    await postman.updateSchema(
      swaggerJson,
      args.apiId,
      args.apiVersionId,
      args.schemaId
    )
    let collection
    try {
      collection = await converter_1.convertSwaggerToCollection(file)
    } catch (error) {
      return this.error(error)
    }
    const collectionUid = await postman.createCollection(collection)
    // Retrieve the new collection's data. We'll be updating our main API's Documentation Collection with it.
    const { item, variable } = await postman.getCollection(collectionUid)
    // Delete the imported collection otherwise Postman will complain about the rearrangement.
    await postman.deleteGeneratedCollection(collectionUid)
    // Retrieve the main Documentation Collection to retain `collection.info`.
    const { info } = await postman.getCollection(args.collectionUid)
    // Update the main Documentation Collection with the new Schema.
    await postman.updateCollection(args.collectionUid, { info, item, variable })
  }
}
Swagger2PostmanDoc.description =
  'CLI tool to generate Postman Documentation from Swagger and update a Collection.'
Swagger2PostmanDoc.flags = {
  // add --version flag to show CLI version
  version: command_1.flags.version({ char: 'v' }),
  help: command_1.flags.help({ char: 'h' }),
}
Swagger2PostmanDoc.args = [
  { name: 'file', required: true, description: 'Path to Swagger file' },
  { name: 'apiKey', required: true, description: 'Postman API key' },
  { name: 'apiId', required: true, description: 'Postman API Id' },
  {
    name: 'apiVersionId',
    required: true,
    description: 'Postman API Version Id',
  },
  { name: 'schemaId', required: true, description: 'Postman API Schema Id' },
  {
    name: 'collectionUid',
    required: true,
    description: 'Postman API Documentation Collection Uid',
  },
]
module.exports = Swagger2PostmanDoc
