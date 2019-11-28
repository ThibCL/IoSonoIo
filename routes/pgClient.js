var pg = require("pg")

class Client {
  constructor() {
    this.cl = new pg.Client(
      "postgres://postgres:gameboy@localhost:5432/iosonoio"
    )
  }

  async connect() {
    await this.cl.connect()
  }

  disconnect() {
    this.cl.end()
  }

  async startGame() {
    let query = await this.cl.query(
      "INSERT INTO game(turn) VALUES (0) RETURNING id"
    )

    return query
  }

  async getGame(id) {
    let query = await this.cl.query("SELECT * FROM game WHERE id = $1", [id])
    return query
  }

  async endGame(id) {
    await this.cl.query("DELETE FROM avatar WHERE id = $1", [id])
    await this.cl.query("DELETE FROM player WHERE id = $1", [id])
    await this.cl.query("DELETE FROM game WHERE id = $1;", [id])
  }

  async addMember(id, name, turn) {
    await this.cl.query(
      "INSERT INTO player(id,name,turn_played,my_turn) VALUES ($1,$2,$3,false)",
      [id, name, turn]
    )
  }

  async getMembers(id) {
    let query = await this.cl.query("SELECT * FROM player where id = $1", [id])
    return query
  }

  async createAvatar(gameId, playerId) {
    await this.cl.query("INSERT INTO avatar(id,player_id) VALUES ($1,$2)", [
      gameId,
      playerId
    ])
  }

  async getAvatar(gameId) {
    let query = await this.cl.query(
      "SELECT * FROM avatar JOIN player ON avatar.player_id=player.player_id WHERE avatar.id=$1",
      [gameId]
    )
    return query
  }

  async getValue(gender, table, name) {
    let query = await this.cl.query(
      "SELECT * FROM " + table + " WHERE name=$1 AND gender_id=$2",
      [name, gender]
    )
    return query
  }

  async updateAvatar(gameId, table, id) {
    let query = await this.cl.query(
      "UPDATE avatar set " + table + "_id=$1 WHERE avatar.id=$2",
      [id, gameId]
    )
    return query
  }
}

module.exports = Client
