const request = require("supertest")
const server = require("./server")
const db = require("../data/db-config")
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})
describe("[GET] /api/games", () => {
  let res
  beforeEach(async () => {
    res = await request(server).get("/api/games")
  })
  it("[10]gets a 200", async () => {
    expect(res.status).toBe(200)
  })
  it("[11]gets correct number", async () => {
    expect(res.body).toHaveLength(4)
  })
  it("[12]gets data in the correct shape", async () => {
    expect(res.body).toMatchObject([
      {
        game_id: 1,
        game_name: "soccer",
        max_players: 11,
      },
      {
        game_id: 2,
        game_name: "chess",
        max_players: 2,
      },
      {
        game_id: 3,
        game_name: "solitaire",
        max_players: 2,
      },
      {
        game_id: 4,
        game_name: "cricket",
        max_players: 11,
      },
    ])
  })
})
describe("[POST] /api/games", () => {
  let res 
  beforeEach(async () => {
  res = await request(server).post("/api/games").send({ game_name: "uno" })
  })
  it("[13]adding game increases length of table", async () => {
    const games = await db("games")
    expect(games).toHaveLength(5)
  })
  it("[14]responds with 201 CREATED", async () => {
    expect(res.status).toBe(201)
  })
})
