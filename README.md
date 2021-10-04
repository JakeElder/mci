# mci

MCI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mci.svg)](https://npmjs.org/package/mci)
[![Downloads/week](https://img.shields.io/npm/dw/mci.svg)](https://npmjs.org/package/mci)
[![License](https://img.shields.io/npm/l/mci.svg)](https://github.com/JakeElder/mci/blob/master/package.json)

<!-- toc -->
* [mci](#mci)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g mci
$ mci COMMAND
running command...
$ mci (-v|--version|version)
mci/0.0.0 darwin-x64 node-v15.12.0
$ mci --help [COMMAND]
USAGE
  $ mci COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`mci atlas:create-user`](#mci-atlascreate-user)
* [`mci atlas:get-user`](#mci-atlasget-user)
* [`mci github:get-repo ID`](#mci-githubget-repo-id)
* [`mci google-cloud:create-app`](#mci-google-cloudcreate-app)
* [`mci google-cloud:enable-service`](#mci-google-cloudenable-service)
* [`mci google-cloud:get-project ID`](#mci-google-cloudget-project-id)
* [`mci google-cloud:setup-project`](#mci-google-cloudsetup-project)
* [`mci google-cloud:update-billing`](#mci-google-cloudupdate-billing)
* [`mci help [COMMAND]`](#mci-help-command)
* [`mci vercel:get-project ID`](#mci-vercelget-project-id)

## `mci atlas:create-user`

Creates a user using the MONGO_USER_ID and MONGO_USER_TOKEN env variables. Sets dbAdmin and readWrite roles on database of the same name

```
USAGE
  $ mci atlas:create-user

OPTIONS
  --name=name            (required) The users name
  --password=password    (required) The users password
  --projectId=projectId  (required) The project Id
```

_See code: [src/commands/atlas/create-user.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/atlas/create-user.ts)_

## `mci atlas:get-user`

gets a user using the MONGO_USER_ID and MONGO_USER_TOKEN env variables

```
USAGE
  $ mci atlas:get-user

OPTIONS
  --name=name            (required) The users name
  --projectId=projectId  (required) The project Id
```

_See code: [src/commands/atlas/get-user.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/atlas/get-user.ts)_

## `mci github:get-repo ID`

gets a repo using the GITHUB_TOKEN env variable

```
USAGE
  $ mci github:get-repo ID

ARGUMENTS
  ID  The repo to retrieve, in org/repo format
```

_See code: [src/commands/github/get-repo.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/github/get-repo.ts)_

## `mci google-cloud:create-app`

updates a projects billing account using GOOGLE_APPLICATION_CREDENTIALS env var

```
USAGE
  $ mci google-cloud:create-app

OPTIONS
  --projectId=projectId  (required) The parent project Id
```

_See code: [src/commands/google-cloud/create-app.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/google-cloud/create-app.ts)_

## `mci google-cloud:enable-service`

updates a projects billing account using GOOGLE_APPLICATION_CREDENTIALS env var

```
USAGE
  $ mci google-cloud:enable-service

OPTIONS
  --projectNumber=projectNumber  (required) The project number
  --service=service              (required) The service to enable
```

_See code: [src/commands/google-cloud/enable-service.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/google-cloud/enable-service.ts)_

## `mci google-cloud:get-project ID`

gets up a Google Cloud project using GOOGLE_APPLICATION_CREDENTIALS

```
USAGE
  $ mci google-cloud:get-project ID

ARGUMENTS
  ID  The name of the project
```

_See code: [src/commands/google-cloud/get-project.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/google-cloud/get-project.ts)_

## `mci google-cloud:setup-project`

sets up a Google Cloud project using GOOGLE_APPLICATION_CREDENTIALS GOOGLE_CLOUD_PARENT_FOLDER_ID and GOOGLE_CLOUD_BILLING_ACCOUNT_ID

```
USAGE
  $ mci google-cloud:setup-project

OPTIONS
  --id=id      (required) The project Id
  --name=name  (required) The name of the project
```

_See code: [src/commands/google-cloud/setup-project.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/google-cloud/setup-project.ts)_

## `mci google-cloud:update-billing`

updates a projects billing account using GOOGLE_APPLICATION_CREDENTIALS env var

```
USAGE
  $ mci google-cloud:update-billing

OPTIONS
  --billingAccountName=billingAccountName  (required) The billing account to set
  --projectId=projectId                    (required) The id of the project
```

_See code: [src/commands/google-cloud/update-billing.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/google-cloud/update-billing.ts)_

## `mci help [COMMAND]`

display help for mci

```
USAGE
  $ mci help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `mci vercel:get-project ID`

gets a project using the VERCEL_TOKEN env variables

```
USAGE
  $ mci vercel:get-project ID

ARGUMENTS
  ID  The project Id
```

_See code: [src/commands/vercel/get-project.ts](https://github.com/JakeElder/mci/blob/v0.0.0/src/commands/vercel/get-project.ts)_
<!-- commandsstop -->
