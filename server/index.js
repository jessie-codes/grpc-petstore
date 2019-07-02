const grpc = require('grpc')
const proto = require('../proto')
const services = require('./services')

const server = new grpc.Server()

server.addService(proto.PetStore.service, {
  getAll: services.getPets,
  getPet: services.getPet,
  createPet: services.createPet,
  updatePet: services.updatePet,
  deletePet: services.deletePet
})

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()
