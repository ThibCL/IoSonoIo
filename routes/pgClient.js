var pg = require("pg")
var logger = require("../logger")
var BadRequestError = require("../error")

class Client {
  constructor() {}
  //"postgres://postgres:gameboy@localhost:5432/iosonoio"

  async newGame() {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "INSERT INTO game(turn) VALUES (0) RETURNING id"
      )

      if (query.rowCount == 0) {
        throw new Error("Unexpected Error")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      await client.end()
    }
  }

  async getGame(id) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query("SELECT * FROM game WHERE id = $1", [id])

      if (query.rowCount == 0) {
        throw new BadRequestError("This game does not exist")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async endGame(id) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query("DELETE FROM avatar WHERE id = $1", [id])
      await client.query("DELETE FROM player WHERE id = $1", [id])
      await client.query("DELETE FROM question_asked WHERE id = $1", [id])
      await client.query("DELETE FROM game WHERE id = $1;", [id])
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async addMember(id, name, turn) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query(
        "INSERT INTO player(id,name,turn_played,my_turn) VALUES ($1,$2,$3,false)",
        [id, name, turn]
      )
    } catch (e) {
      logger.error(e)
      throw e
    } finally {
      client.end()
    }
  }

  async getMembers(id) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query("SELECT * FROM player where id = $1", [id])

      if (query.rowCount == 0) {
        throw new BadRequestError("No players have been added to the game")
      }

      return query.rows
    } catch (e) {
      logger.error(e)
      throw e
    } finally {
      client.end()
    }
  }

  async getMembersToPlay(gameId, turn) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = client.query(
        "SELECT * FROM player WHERE id=$1 and turn_played < $2",
        [gameId, turn]
      )
      return (await query).rows
    } catch (e) {
      logger.error(e)
      throw e
    } finally {
      client.end()
    }
  }

  async createAvatar(gameId, playerId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query("INSERT INTO avatar(id,player_id) VALUES ($1,$2)", [
        gameId,
        playerId
      ])
    } catch (e) {
      logger.error(e)
      throw e
    } finally {
      client.end()
    }
  }

  async getAvatar(gameId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "SELECT * FROM avatar JOIN player ON avatar.player_id=player.player_id WHERE avatar.id=$1",
        [gameId]
      )

      if (query.rowCount == 0) {
        throw new BadRequestError("The game has not begun yet")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async getValue(gender, table, name) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "SELECT * FROM " + table + " WHERE name=$1 AND gender_id=$2",
        [name, gender]
      )

      if (query.rowCount == 0) {
        logger.error(
          "No value correspond to this name in the database:" + name + gender
        )
        throw new BadRequestError(
          "This name does not exist yet, please reformulate your sentence"
        )
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async getGenderId(name) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query("SELECT * FROM gender WHERE name=$1", [
        name
      ])

      if (query.rowCount == 0) {
        logger.error("The id of the gender has not be found")
        throw Error("Unexpected error")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async updateAvatar(gameId, table, id) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query(
        "UPDATE avatar set " + table + "_id=$1 WHERE avatar.id=$2",
        [id, gameId]
      )
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async getPlayerTurn(gameId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "SELECT * FROM player WHERE id=$1 AND my_turn=true",
        [gameId]
      )

      if (query.rowCount == 0) {
        throw Error("Unexpected Error, please retry")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async playerNextTurn(turn, playerId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query(
        "UPDATE player SET turn_played=$1, my_turn=false WHERE player_id=$2",
        [turn, playerId]
      )
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async nextTurn(turn, gameId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query("UPDATE game SET turn=$1 WHERE id=$2", [turn, gameId])
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async beginPlayerTurn(playerId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query(
        "UPDATE player set my_turn = true WHERE player_id=$1",
        [playerId]
      )
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async getActiveQuestion(gameId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "SELECT * FROM question_asked JOIN question ON question_asked.question_id=question.question_id WHERE id=$1 AND waiting=true",
        [gameId]
      )

      if (query.rowCount == 0) {
        logger.error("There is no question active")
        return Error("Unexpected Error")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async activeQuestion(questionId, gameId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query(
        "INSERT INTO question_asked (question_id, id, waiting) VALUES ($1, $2, true)",
        [questionId, gameId]
      )
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async desactiveQuestion(questionId, gameId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      await client.query(
        "UPDATE question_asked SET waiting=false WHERE question_id=$1 and id=$2",
        [questionId, gameId]
      )
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async getQuestionId(context) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "SELECT * FROM question WHERE context=$1",
        [context]
      )

      if (query.rowCount == 0) {
        logger.error("No question associate to the context" + context)
        throw Error("Unexpected Error, please retry")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async getQuestion(questionId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "SELECT * FROM question WHERE question_id=$1",
        [questionId]
      )

      if (query.rowCount == 0) {
        logger.error("There is no question corresponding to this id")
        throw Error("Unexpected error")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async getQuestionsLeft(gameId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "SELECT question_id FROM question EXCEPT SELECT question_id FROM question_asked WHERE id=$1",
        [gameId]
      )
      return query.rows
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }

  async getAvatarValue(gameId) {
    let client = new pg.Client(process.env.DATABASE_URL, true)
    await client.connect()

    try {
      let query = await client.query(
        "SELECT avatar_id,eye.value AS eye_value, hair.value AS hair_value, nose.value AS nose_value, hair_tone.value AS hair_tone_value, mouth.value AS mouth_value, pupil_tone.value AS pupil_tone_value, avatar.gender_id FROM avatar LEFT JOIN hair ON avatar.hair_id=hair.hair_id LEFT JOIN nose ON avatar.nose_id=nose.nose_id LEFT JOIN hair_tone ON avatar.hair_tone_id=hair_tone.hair_tone_id LEFT JOIN mouth ON avatar.mouth_id=mouth.mouth_id LEFT JOIN pupil_tone ON avatar.pupil_tone_id=pupil_tone.pupil_tone_id LEFT JOIN eye ON avatar.eye_id=eye.eye_id WHERE avatar.id=$1 ",
        [gameId]
      )

      if (query.rowCount == 0) {
        logger.error("There is no avatar associated with the game")
        throw Error("Unexpected error, please retry")
      }

      return query.rows[0]
    } catch (e) {
      logger.error(e.message)
      throw e
    } finally {
      client.end()
    }
  }
}

module.exports = Client
