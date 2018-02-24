import Folders from "./SQLite/Folders"
import Phrases from "./SQLite/Phrases"
import SQLiteAccessor from "./SQLiteAccessor"

const sqlite3 = require('sqlite3').verbose()


export default class SQLite
{
  constructor(dbpath = ":memory:", autoOpen = true) {
    this.errorMessage = undefined
    this.db = undefined

    if(autoOpen)
      this.open(dbpath)
  }

  open(path) {
    this.db = new sqlite3.Database(path,(err) => {
      if (err) {
        this.errorMessage = err.message
        return console.error(err.message)
      }
      console.log('Connected to the SQLite database.')
    })
    this.init()
    this.folders = new Folders(this.db)
    this.phrases = new Phrases(this.db)
  }

  init() {
    let accessor = new SQLiteAccessor(this.db)
    this.db.serialize()
    accessor.run(Folders.CREATE_STATEMENT, []).catch((err) => {
      this.errorMessage = err
      console.error('Found error in Folders table creation: ', err)
    })
    accessor.run(Phrases.CREATE_STATEMENT, []).catch((err) => {
      this.errorMessage = err
      console.error('Found error in Phrases table creation: ', err)
    })
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.log('Error during close: ', err)
        this.errorMessage = err.message
        return console.error(err.message)
      }
      console.log('Closed the database connection.')
    })
    this.db = undefined
  }

}
