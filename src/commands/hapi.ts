import { Command, flags } from '@oclif/command'
import { generate } from '../hapi-swagger'

export class SwaggerFromHapi extends Command {
  static description = 'Generate Swagger from Hapi Swagger.'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-o, --output=VALUE)
    output: flags.string({
      char: 'o',
      description: 'swagger output path',
    }),
  }

  static args = [
    { name: 'host', required: true, description: 'Hapi Swagger host' },
  ]

  async run() {
    const { args, flags } = this.parse(SwaggerFromHapi)
    await generate(args.host, flags.output || 'swagger.json')
  }
}
