var pg = require("pg")

class Client {
  constructor() {
    this.cl = new pg.Client(
      "postgres://postgres:gameboy@localhost:5432/iosonoio"
    )
  }

  async startGame() {
    await this.cl.connect()
    let query = await this.cl.query(
      "INSERT INTO game(turn) VALUES (0) RETURNING id"
    )
    this.cl.end()

    return query
  }

  async getGame(id) {
    await this.cl.connect()
    let query = await this.cl.query("SELECT * FROM game WHERE id = $1", [id])
    this.cl.end()
    return query
  }

  async endGame(id) {
    await this.cl.connect()
    await this.cl.query("DELETE FROM avatar WHERE id = $1", [id])
    await this.cl.query("DELETE FROM player WHERE id = $1", [id])
    await this.cl.query("DELETE FROM game WHERE id = $1;", [id])
    this.cl.end()
  }

  async addMember(id, name, turn) {
    await this.cl.connect()
    await this.cl.query(
      "INSERT INTO player(id,name,turn_played) VALUES ($1,$2,$3)",
      [id, name, turn]
    )
    this.cl.end()
  }

  async getAvatar() {}

  async updateAvatar() {}
}

module.exports = Client
