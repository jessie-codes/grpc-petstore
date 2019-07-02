const { status } = require('grpc')
const db = require('../db')

const getPets = (call, callback) => {
  callback(null, db.get())
}

const getPet = (call, callback) => {
  const pet = db.getPet(call.request)
  if (!pet) {
    const err = {
      message: 'Pet Not Found',
      status: status.NOT_FOUND
    }
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
    const err = {
      message: 'Pet Not Found',
      status: status.NOT_FOUND
    }
    callback(err)
    return
  }
  callback(null, pet)
}

const deletePet = (call, callback) => {
  const err = {
    message: 'Service Not Implemented',
    status: status.UNIMPLEMENTED
  }
  callback(err)
}

module.exports = {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet
}
