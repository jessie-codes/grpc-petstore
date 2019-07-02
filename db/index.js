const { resolve } = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const uuidv4 = require('uuid/v4')

const adapter = new FileSync(resolve(__dirname, 'db.json'))
const db = low(adapter)

db.defaults({ pets: [] }).write()

const get = () => {
  return db.get('pets').value()
}

const getPet = pet => {
  return db.get('pets')
    .find({ id: pet.id })
    .value()
}

const createPet = pet => {
  pet.id = uuidv4()
  db.get('pets')
    .push(pet)
    .write()
  return pet
}

const updatePet = pet => {
  const p = getPet(pet)
  if (!p) return
  db.get('pets')
    .find({ id: pet.id })
    .assign(pet)
    .write()
  return getPet(p)
}

const removePet = pet => {
  return db.get('pets')
    .remove({ id: pet.id })
    .write()
}

module.exports = {
  get,
  getPet,
  createPet,
  updatePet,
  removePet
}
