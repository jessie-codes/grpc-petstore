const { resolve } = require('path')
const { loadPackageDefinition } = require('grpc')
const { loadSync } = require('@grpc/proto-loader')

const PROTO_PATH = resolve(__dirname, 'petstore.proto')

const packageDefinition = loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const { petstore } = loadPackageDefinition(packageDefinition)

module.exports = petstore
