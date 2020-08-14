import { Command, flags } from '@oclif/command'
import { Postman } from './postman'

class Swagger2PostmanDoc extends Command {
  static description =
    'CLI tool to generate Postman Documentation from Swagger and update a Collection.'

  helpText = 'See more help with --help.'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
  }

  static args = [
    { name: 'file', required: true, description: 'Path to Swagger file' },
    { name: 'apiKey', required: true, description: 'Postman API key' },
    {
      name: 'workspaceId',
      required: true,
      description: 'Postman Workspace Id',
    },
    { name: 'apiId', required: true, description: 'Postman API Id' },
    {
      name: 'apiVersionId',
      required: true,
      description: 'Postman API Version Id',
    },
    { name: 'schemaId', required: true, description: 'Postman API Schema Id' },
    {
      name: 'collectionId',
      required: true,
      description: 'Postman API Documentation Collection Id',
    },
  ]

  async run() {
    const { args } = this.parse(Swagger2PostmanDoc)
    const postman = new Postman(args.apiKey)
    let swaggerJson
    const file = `${process.cwd()}/${args.file}`
    try {
      swaggerJson = require(file || '')
    } catch (error) {
      throw new Error(
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
    // Generate a Postman Documentation Collection from the Schema.
    const collectionUid = await postman.generateCollectionFromSchema(
      args.workspaceId,
      args.apiId,
      args.apiVersionId,
      args.schemaId
    )
    // Retrieve the generated collection's data. We'll be updating our main API's Documentation Collection with it.
    const { item, variable } = await postman.getCollection(collectionUid)
    // Delete the generated collection otherwise Postman will complain about the rearrangement.
    await postman.deleteGeneratedCollection(collectionUid)
    // Retrieve the main Documentation Collection to retain `collection.info`.
    const { info } = await postman.getCollection(args.collectionId)
    // Update the main Documentation Collection with the new Schema.
    await postman.updateCollection(args.collectionId, { info, item, variable })
  }
}

export = Swagger2PostmanDoc
