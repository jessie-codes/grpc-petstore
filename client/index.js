const { credentials, status } = require('grpc')
const sade = require('sade')
const proto = require('../proto')
const client = new proto.petstore.PetStore('localhost:50051', credentials.createInsecure())
const health = new proto.health.Health('localhost:50051', credentials.createInsecure())

const cli = sade('petstore')

const statuses = proto.petstore.Status.type.value.map(s => {
  return s.name
})

const protoStatus = (status) => {
  if (statuses.indexOf(status.toUpperCase())) return status.toUpperCase()
}

cli
  .version('1.0.0')

cli
  .command('get-all')
  .describe('Get all pets')
  .action(() => {
    client.getAll({}, (err, pets) => {
      if (err) {
        console.log(err.details)
        process.exit(err.code)
      }
      console.log(pets)
    })
  })

cli
  .command('get-pet <id>')
  .describe('Get all pets')
  .action((id) => {
    client.getPet({ id: id }, (err, pet) => {
      if (err) {
        console.log(err.details)
        process.exit(err.code)
      }
      console.log(pet)
    })
  })

cli
  .command('create-pet <name> <availability>')
  .describe('Create a new pet')
  .action((name, availability) => {
    const ps = protoStatus(availability)
    if (!ps) {
      console.log(`Status must be one of: ${statuses.join()}`)
      process.exit(status.INVALID_ARGUMENT)
    }
    client.createPet({
      name,
      status: ps
    }, (err, pet) => {
      if (err) {
        console.log(err.details)
        process.exit(err.code)
      }
      console.log(pet)
    })
  })

cli
  .command('update-pet <id> <name> <availability>')
  .describe('Update an existing pet')
  .action((id, name, availability) => {
    const ps = protoStatus(availability)
    if (!ps) {
      console.log(`Status must be one of: ${statuses.join()}`)
      process.exit(status.INVALID_ARGUMENT)
    }
    client.updatePet({
      id,
      name,
      status: ps
    }, (err, pet) => {
      if (err) {
        console.log(err.details)
        process.exit(err.code)
      }
      console.log(pet)
    })
  })

cli
  .command('delete-pet <id>')
  .describe('Delete a pet')
  .action((id) => {
    client.deletePet({ id: id }, (err, pet) => {
      if (err) {
        console.log(err.details)
        process.exit(err.code)
      }
      console.log(pet)
    })
  })

cli
  .command('check-health')
  .describe('Checks the health of the server')
  .action(() => {
    health.check({ service: 'petstore' }, (err, health) => {
      if (err) {
        console.log(err.details)
        process.exit(err.code)
      }
      console.log(health)
    })
  })

cli.parse(process.argv)
