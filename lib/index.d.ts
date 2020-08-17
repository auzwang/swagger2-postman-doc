import { Command } from '@oclif/command'
declare class Swagger2PostmanDoc extends Command {
  static description: string
  helpText: string
  static flags: {
    version: import('@oclif/parser/lib/flags').IBooleanFlag<void>
    help: import('@oclif/parser/lib/flags').IBooleanFlag<void>
  }
  static args: {
    name: string
    required: boolean
    description: string
  }[]
  run(): Promise<undefined>
}
export = Swagger2PostmanDoc
