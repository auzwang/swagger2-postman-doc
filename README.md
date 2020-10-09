# swagger2-postman-doc

CLI tool to generate Postman Documentation from Swagger and update a Collection.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/swagger2-postman-doc.svg)](https://npmjs.org/package/swagger2-postman-doc)
[![Downloads/week](https://img.shields.io/npm/dw/swagger2-postman-doc.svg)](https://npmjs.org/package/swagger2-postman-doc)
[![License](https://img.shields.io/npm/l/swagger2-postman-doc.svg)](https://github.com/auzwang/swagger2-postman-doc/blob/master/package.json)

<!-- toc -->

- [swagger2-postman-doc](#swagger2-postman-doc)
- [Description](#description)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Description

<!-- description -->

Postman supports syncing [schema syncing with GitHub](https://learning.postman.com/docs/integrations/available-integrations/github/#syncing-your-api-schemas-on-github)
but _currently_ requires the manual generation of a documentation collection from the
schema. Codified schema updates therefore create a new collection each sync or manually
validating the schema to sync, necessitating another process of reconciling updates with
published documentation.

This tool does the following:

1. Updates a Postman API schema with a given Swagger definition.
2. Converts the Swagger definition into OpenAPI 3 using [swagger2openapi](https://github.com/Mermade/oas-kit/blob/master/packages/swagger2openapi/).
3. Converts the OpenAPI definition into a Postman Collection using [openapi-to-postman](https://github.com/localz/openapi-to-postman).
4. Updates given Documentation Collection with the converted one.

<!-- descriptionstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g swagger2-postman-doc
$ swagger2-postman-doc COMMAND
running command...
$ swagger2-postman-doc (-v|--version|version)
swagger2-postman-doc/3.1.1 darwin-x64 node-v12.14.1
$ swagger2-postman-doc --help [COMMAND]
USAGE
  $ swagger2-postman-doc COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`swagger2-postman-doc hapi HOST`](#swagger2-postman-doc-hapi-host)
- [`swagger2-postman-doc help [COMMAND]`](#swagger2-postman-doc-help-command)
- [`swagger2-postman-doc postman FILE APIKEY APIID APIVERSIONID SCHEMAID COLLECTIONUID`](#swagger2-postman-doc-postman-file-apikey-apiid-apiversionid-schemaid-collectionuid)

## `swagger2-postman-doc hapi HOST`

Generate Swagger from Hapi Swagger.

```
USAGE
  $ swagger2-postman-doc hapi HOST

ARGUMENTS
  HOST  Hapi Swagger host

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  swagger output path
```

_See code: [src/commands/hapi.ts](https://github.com/auzwang/swagger2-postman-doc/blob/v3.1.1/src/commands/hapi.ts)_

## `swagger2-postman-doc help [COMMAND]`

display help for swagger2-postman-doc

```
USAGE
  $ swagger2-postman-doc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `swagger2-postman-doc postman FILE APIKEY APIID APIVERSIONID SCHEMAID COLLECTIONUID`

Generate Postman Documentation from Swagger and update a Collection.

```
USAGE
  $ swagger2-postman-doc postman FILE APIKEY APIID APIVERSIONID SCHEMAID COLLECTIONUID

ARGUMENTS
  FILE           Path to Swagger file
  APIKEY         Postman API key
  APIID          Postman API Id
  APIVERSIONID   Postman API Version Id
  SCHEMAID       Postman API Schema Id
  COLLECTIONUID  Postman API Documentation Collection Uid

OPTIONS
  -h, --help                                    show CLI help
  -o, --output=output                           Postman Collection output path

  --exampleParametersResolution=schema|example  [default: example] Swagger to Postman Collection: generate the response
                                                parameters based on the schema or example

  --folderStrategy=paths|tags                   [default: tags] Swagger to Postman Collection: create folders according
                                                to the spec’s paths or tags

  --requestParametersResolution=schema|example  [default: schema] Swagger to Postman Collection: generate the request
                                                parameters based on the schema or example
```

_See code: [src/commands/postman.ts](https://github.com/auzwang/swagger2-postman-doc/blob/v3.1.1/src/commands/postman.ts)_

<!-- commandsstop -->
