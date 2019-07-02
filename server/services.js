const { status } = require('grpc')
const grpc = require('@grpc/grpc-js')
const db = require('../db')

const getPets = (call, callback) => {
  callback(null, db.get())
}

const getPet = (call, callback) => {
  const pet = db.getPet(call.request)
  if (!pet) {
    const err = new grpc.StatusBuilder().withCode(status.NOT_FOUND).withDetails('Pet Not Found').build()
    callback(err)
    return
  }
  callback(null, pet)
}

const createPet = (call, callback) => {
  callback(null, db.createPet(call.request))
}

const updatePet = (call, callback) => {
  const pet = db.updatePet(call.request)
  if (!pet) {
    const err = new grpc.StatusBuilder().withCode(status.NOT_FOUND).withDetails('Pet Not Found').build()
    callback(err.build())
    return
  }
  callback(null, pet)
}

const deletePet = (call, callback) => {
  const err = new grpc.StatusBuilder().withCode(status.UNIMPLEMENTED).withDetails('Service Not Implemented').build()
  callback(err)
}

const check = (call, callback) => {
  callback(null, { status: 1 })
}

const watch = (call, callback) => {
  const err = new grpc.StatusBuilder().withCode(status.UNIMPLEMENTED).withDetails('Service Not Implemented').build()
  callback(err)
}

module.exports = {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
  check,
  watch
}
