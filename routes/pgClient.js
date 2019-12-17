var pg = require("pg")

class Client {
  constructor() {
    this.cl = new pg.Client(process.env.DATABASE_URL, true)
  }
  //"postgres://postgres:gameboy@localhost:5432/iosonoio"

  async connect() {
    await this.cl.connect()
  }

  disconnect() {
    this.cl.end()
  }

  async newGame() {
    let query = await this.cl.query(
      "INSERT INTO game(turn) VALUES (0) RETURNING id"
    )

    if (query.rowCount == 0) {
      return {
        error: true,
        status: 500,
        message:
          "A error occured during the creation of the new game, please retry"
      }
    }

    return {
      error: false,
      game: query.rows[0]
    }
  }

  async getGame(id) {
    let query = await this.cl.query("SELECT * FROM game WHERE id = $1", [id])
    if (query.rowCount == 0) {
      return {
        error: true,
        status: 400,
        message: "The game does not exist"
      }
    }

    return {
      error: false,
      game: query.rows[0]
    }
  }

  async endGame(id) {
    await this.cl.query("DELETE FROM avatar WHERE id = $1", [id])
    await this.cl.query("DELETE FROM player WHERE id = $1", [id])
    await this.cl.query("DELETE FROM question_asked WHERE id = $1", [id])
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

  async getMembersToPlay(gameId, turn) {
    let query = await this.cl.query(
      "SELECT * FROM player WHERE id=$1 and turn_played < $2",
      [gameId, turn]
    )
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

  async getGenderId(name) {
    let query = await this.cl.query("SELECT * FROM gender WHERE name=$1", [
      name
    ])
    return query
  }

  async updateAvatar(gameId, table, id) {
    let query = await this.cl.query(
      "UPDATE avatar set " + table + "_id=$1 WHERE avatar.id=$2",
      [id, gameId]
    )
    return query
  }

  async getPlayerTurn(gameId) {
    let query = await this.cl.query(
      "SELECT * FROM player WHERE id=$1 AND my_turn=true",
      [gameId]
    )
    return query
  }

  async playerNextTurn(turn, playerId) {
    await this.cl.query(
      "UPDATE player SET turn_played=$1, my_turn=false WHERE player_id=$2",
      [turn, playerId]
    )
  }

  async nextTurn(turn, gameId) {
    await this.cl.query("UPDATE game SET turn=$1 WHERE id=$2", [turn, gameId])
  }

  async beginPlayerTurn(playerId) {
    await this.cl.query("UPDATE player set my_turn = true WHERE player_id=$1", [
      playerId
    ])
  }

  async getActiveQuestion(gameId) {
    let query = await this.cl.query(
      "SELECT * FROM question_asked JOIN question ON question_asked.question_id=question.question_id WHERE id=$1 AND waiting=true",
      [gameId]
    )
    return query
  }

  async activeQuestion(questionId, gameId) {
    await this.cl.query(
      "INSERT INTO question_asked (question_id, id, waiting) VALUES ($1, $2, true)",
      [questionId, gameId]
    )
  }

  async desactiveQuestion(questionId, gameId) {
    await this.cl.query(
      "UPDATE question_asked SET waiting=false WHERE question_id=$1 and id=$2",
      [questionId, gameId]
    )
  }

  async getQuestionId(context) {
    let query = await this.cl.query("SELECT * FROM question WHERE context=$1", [
      context
    ])
    return query
  }

  async getQuestion(questionId) {
    let query = await this.cl.query(
      "SELECT * FROM question WHERE question_id=$1",
      [questionId]
    )
    return query
  }

  async getQuestionsLeft(gameId) {
    let query = await this.cl.query(
      "SELECT question_id FROM question EXCEPT SELECT question_id FROM question_asked WHERE id=$1",
      [gameId]
    )
    return query
  }

  async getAvatarValue(gameId) {
    let query = await this.cl.query(
      "SELECT avatar_id,eye.value AS eye_value, hair.value AS hair_value, nose.value AS nose_value, hair_tone.value AS hair_tone_value, mouth.value AS mouth_value, pupil_tone.value AS pupil_tone_value, avatar.gender_id FROM avatar LEFT JOIN hair ON avatar.hair_id=hair.hair_id LEFT JOIN nose ON avatar.nose_id=nose.nose_id LEFT JOIN hair_tone ON avatar.hair_tone_id=hair_tone.hair_tone_id LEFT JOIN mouth ON avatar.mouth_id=mouth.mouth_id LEFT JOIN pupil_tone ON avatar.pupil_tone_id=pupil_tone.pupil_tone_id LEFT JOIN eye ON avatar.eye_id=eye.eye_id WHERE avatar.id=$1 ",
      [gameId]
    )
    return query
  }
}

module.exports = Client
