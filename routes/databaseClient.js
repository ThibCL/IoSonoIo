var pg = require("pg")

class dbClient {
    constructor(login, password, dbName){
        this.conString = "postgres://" + login + ":" + password + "@localhost:5432/" + dbName 
    }

    getGame(id) {
        var client = new pg.Client(this.conString)
        await client.connect()

        game = await client.query("SELECT * FROM game")
        console.log(game.rows[0])
    }

}

var dbCl = dbClient("thibault", "gameboy", "iosonoio")

export {dbCl}