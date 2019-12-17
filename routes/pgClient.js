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
    this.cl.connect()
    let query = await this.cl.query(
      "INSERT INTO game(turn) VALUES (0) RETURNING id"
    )
    this.cl.end()

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
    this.cl.connect()
    let query = await this.cl.query("SELECT * FROM game WHERE id = $1", [id])
    this.cl.end()

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
    this.cl.connect()
    await this.cl.query("DELETE FROM avatar WHERE id = $1", [id])
    this.cl.end()

    await this.cl.query("DELETE FROM player WHERE id = $1", [id])
    await this.cl.query("DELETE FROM question_asked WHERE id = $1", [id])
    await this.cl.query("DELETE FROM game WHERE id = $1;", [id], (err, res) => {
      if (err) throw err
      console.log(res)
      this.cl.end()
    })
    this.cl.end()
  }

  async addMember(id, name, turn) {
    this.cl.connect()
    await this.cl.query(
      "INSERT INTO player(id,name,turn_played,my_turn) VALUES ($1,$2,$3,false)",
      [id, name, turn]
    )
    this.cl.end()
  }

  async getMembers(id) {
    this.cl.connect()
    let query = await this.cl.query("SELECT * FROM player where id = $1", [id])
    this.cl.end()
    return query
  }

  async getMembersToPlay(gameId, turn) {
    this.cl.connect()
    let query = await this.cl.query(
      "SELECT * FROM player WHERE id=$1 and turn_played < $2",
      [gameId, turn]
    )
    this.cl.end()
    return query
  }

  async createAvatar(gameId, playerId) {
    this.cl.connect()
    await this.cl.query("INSERT INTO avatar(id,player_id) VALUES ($1,$2)", [
      gameId,
      playerId
    ])
    this.cl.end()
  }

  async getAvatar(gameId) {
    this.cl.connect()
    let query = await this.cl.query(
      "SELECT * FROM avatar JOIN player ON avatar.player_id=player.player_id WHERE avatar.id=$1",
      [gameId]
    )
    this.cl.end()
    return query
  }

  async getValue(gender, table, name) {
    this.cl.connect()
    let query = await this.cl.query(
      "SELECT * FROM " + table + " WHERE name=$1 AND gender_id=$2",
      [name, gender]
    )
    this.cl.end()
    return query
  }

  async getGenderId(name) {
    this.cl.connect()
    let query = await this.cl.query("SELECT * FROM gender WHERE name=$1", [
      name
    ])
    this.cl.end()
    return query
  }

  async updateAvatar(gameId, table, id) {
    this.cl.connect()
    let query = await this.cl.query(
      "UPDATE avatar set " + table + "_id=$1 WHERE avatar.id=$2",
      [id, gameId]
    )
    this.cl.end()
    return query
  }

  async getPlayerTurn(gameId) {
    this.cl.connect()
    let query = await this.cl.query(
      "SELECT * FROM player WHERE id=$1 AND my_turn=true",
      [gameId]
    )
    this.cl.end()
    return query
  }

  async playerNextTurn(turn, playerId) {
    this.cl.connect()
    await this.cl.query(
      "UPDATE player SET turn_played=$1, my_turn=false WHERE player_id=$2",
      [turn, playerId]
    )
    this.cl.end()
  }

  async nextTurn(turn, gameId) {
    this.cl.connect()
    await this.cl.query("UPDATE game SET turn=$1 WHERE id=$2", [turn, gameId])
    this.cl.end()
  }

  async beginPlayerTurn(playerId) {
    this.cl.connect()
    await this.cl.query("UPDATE player set my_turn = true WHERE player_id=$1", [
      playerId
    ])
    this.cl.end()
  }

  async getActiveQuestion(gameId) {
    this.cl.connect()
    let query = await this.cl.query(
      "SELECT * FROM question_asked JOIN question ON question_asked.question_id=question.question_id WHERE id=$1 AND waiting=true",
      [gameId]
    )
    this.cl.end()
    return query
  }

  async activeQuestion(questionId, gameId) {
    this.cl.connect()
    await this.cl.query(
      "INSERT INTO question_asked (question_id, id, waiting) VALUES ($1, $2, true)",
      [questionId, gameId]
    )
  }

  async desactiveQuestion(questionId, gameId) {
    this.cl.connect()
    await this.cl.query(
      "UPDATE question_asked SET waiting=false WHERE question_id=$1 and id=$2",
      [questionId, gameId]
    )
    this.cl.end()
  }

  async getQuestionId(context) {
    this.cl.connect()
    let query = await this.cl.query("SELECT * FROM question WHERE context=$1", [
      context
    ])
    this.cl.end()
    return query
  }

  async getQuestion(questionId) {
    this.cl.connect()
    let query = await this.cl.query(
      "SELECT * FROM question WHERE question_id=$1",
      [questionId]
    )
    this.cl.end()
    return query
  }

  async getQuestionsLeft(gameId) {
    this.cl.connect()
    let query = await this.cl.query(
      "SELECT question_id FROM question EXCEPT SELECT question_id FROM question_asked WHERE id=$1",
      [gameId]
    )
    this.cl.end()
    return query
  }

  async getAvatarValue(gameId) {
    this.cl.connect()
    let query = await this.cl.query(
      "SELECT avatar_id,eye.value AS eye_value, hair.value AS hair_value, nose.value AS nose_value, hair_tone.value AS hair_tone_value, mouth.value AS mouth_value, pupil_tone.value AS pupil_tone_value, avatar.gender_id FROM avatar LEFT JOIN hair ON avatar.hair_id=hair.hair_id LEFT JOIN nose ON avatar.nose_id=nose.nose_id LEFT JOIN hair_tone ON avatar.hair_tone_id=hair_tone.hair_tone_id LEFT JOIN mouth ON avatar.mouth_id=mouth.mouth_id LEFT JOIN pupil_tone ON avatar.pupil_tone_id=pupil_tone.pupil_tone_id LEFT JOIN eye ON avatar.eye_id=eye.eye_id WHERE avatar.id=$1 ",
      [gameId]
    )
    this.cl.end()
    return query
  }
}

module.exports = Client
