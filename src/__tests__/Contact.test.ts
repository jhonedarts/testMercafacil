import request from 'supertest'
import { getConnectionManager, getConnection } from 'typeorm'
import { app } from '../app'
import { DB_NAME } from '../database'

describe("Conatcs", () => {
  beforeAll(async () => {
    const macapaConnection = getConnectionManager().get(DB_NAME.MACAPA)
    await macapaConnection.runMigrations()

    const varejaoConnection = getConnectionManager().get(DB_NAME.VAREJAO)
    await varejaoConnection.runMigrations()
  })

  afterAll(async () => {
    const macapaConnection = getConnectionManager().get(DB_NAME.MACAPA)
    await macapaConnection.dropDatabase()
    await macapaConnection.close()

    const varejaoConnection = getConnectionManager().get(DB_NAME.VAREJAO)
    await varejaoConnection.dropDatabase()
    await varejaoConnection.close()
  })

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      contacts: [
        {
          cellphone: "5541959365078",
          name: "Srta. Isabelly Castro"
        },
      ]
    })

    expect(response.status).toBe(201)
  })

  it("Should not be able to create a user with exists email", async () => {
    const response = await request(app).post("/users").send({
      contacts: [
        {
          cellphone: "5541959365078",
          name: "Srta. Isabelly Castro"
        },
      ]
    })

    expect(response.status).toBe(400)
  })
})