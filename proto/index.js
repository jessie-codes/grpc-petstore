const { resolve } = require('path')
const { loadPackageDefinition } = require('grpc')
const { loadSync } = require('@grpc/proto-loader')

const PETSTORE_PROTO_PATH = resolve(__dirname, 'petstore.proto')
const HEALTH_PROTO_PATH = resolve(__dirname, 'health.proto')

const petstorePackageDefinition = loadSync(
  PETSTORE_PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const healthPackageDefinition = loadSync(
  HEALTH_PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const { petstore } = loadPackageDefinition(petstorePackageDefinition)
const { health } = loadPackageDefinition(healthPackageDefinition)

module.exports = {
  petstore,
  health
}
