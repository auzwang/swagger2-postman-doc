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
<!-- tocstop -->

# Description

<!-- description -->

Postman supports syncing [schema syncing with GitHub](https://learning.postman.com/docs/integrations/available-integrations/github/#syncing-your-api-schemas-on-github)
but _currently_ requires the manual generation of a documentation collection from the
schema. Codified schema updates therefore create a new collection each sync, necessitating
another manual process of reconciling updates with published documentation.

This tool does the following:

1. Updates a Postman API schema with a given Swagger (OpenAPI 2) definition.
2. Generates a Postman Documentation Collection.
3. Updates given Documentation Collection with the generated one.

<!-- descriptionstop -->

# Usage

<!-- usage -->

```
USAGE
  $ swagger2-postman-doc FILE APIKEY WORKSPACEID APIID APIVERSIONID SCHEMAID COLLECTIONID

ARGUMENTS
  FILE          Path to Swagger file
  APIKEY        Postman API key
  WORKSPACEID   Postman Workspace Id
  APIID         Postman API Id
  APIVERSIONID  Postman API Version Id
  SCHEMAID      Postman API Schema Id
  COLLECTIONID  Postman API Documentation Collection Id

OPTIONS
  -h, --help     show CLI help
  -v, --version  show CLI version
```

<!-- usagestop -->
