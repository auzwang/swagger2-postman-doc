import { Command, flags } from '@oclif/command'
import { Postman } from '../postman'
import { convertSwaggerToCollection } from '../converter'
import { promises as fs } from 'fs'

export class Swagger2PostmanDoc extends Command {
  static description =
    'Generate Postman Documentation from Swagger and update a Collection.'

  helpText = 'See more help with --help.'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-o, --output=VALUE)
    output: flags.string({
      char: 'o',
      description: 'Postman Collection output path',
    }),
  }

  static args = [
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

  async run() {
    const { args, flags } = this.parse(Swagger2PostmanDoc)
    const postman = new Postman(args.apiKey)
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
      collection = await convertSwaggerToCollection(file)
      const output = flags.output
      if (output) {
        await fs.writeFile(output, JSON.stringify(collection))
        this.log('Saved collection to', output)
      }
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
