# grpc-petstore
gRPC tutorial using Swagger's Petstore Example

## Install Dependencies

```bash
$ npm install
```

## Run gRPC Server

```bash
$ npm run server
```

## Run CLI commands

**Get all pets**

```bash
$ node client/index.js get-all
```

**Get a pet by ID**

```bash
$ node client/index.js get-pet <id>
```

**Create a new pet**

```bash
$ node client/index.js create-pet <name> <availability>
```

**Update an existing pet**

```bash
$ node client/index.js update-pet <id> <name> <availability>
```

**Delete a pet**

```bash
$ node client/index.js delete-pet <id>
```

**Check the server health**

```bash
$ node client/index.js check-health
```
