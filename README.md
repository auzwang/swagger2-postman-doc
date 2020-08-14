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
2. Converts the Swagger definition into a Postman Collection using [openapi-to-postmanv2](https://github.com/postmanlabs/openapi-to-postman).
3. Updates given Documentation Collection with the converted one.

<!-- descriptionstop -->

# Usage

USAGE
\$ swagger2-postman-doc FILE APIKEY APIID APIVERSIONID SCHEMAID COLLECTIONUID

ARGUMENTS
FILE Path to Swagger file
APIKEY Postman API key
APIID Postman API Id
APIVERSIONID Postman API Version Id
SCHEMAID Postman API Schema Id
COLLECTIONUID Postman API Documentation Collection Uid

OPTIONS
-h, --help show CLI help
-v, --version show CLI version
