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

```sh-session
$ npm install -g swagger2-postman-doc
$ swagger2-postman-doc COMMAND
running command...
$ swagger2-postman-doc (-v|--version|version)
swagger2-postman-doc/1.0.2 darwin-x64 node-v12.14.1
$ swagger2-postman-doc --help [COMMAND]
USAGE
  $ swagger2-postman-doc COMMAND
...
```

<!-- usagestop -->
