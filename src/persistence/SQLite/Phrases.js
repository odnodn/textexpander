import SQLiteAccessor from "../SQLiteAccessor"
import Phrase from "../../data/Phrase"

export default class Phrases {
  static get CREATE_STATEMENT() {
    // TIP: ID auto increments in SQLITE even without any flag
    return "CREATE TABLE IF NOT EXISTS PHRASES (id INTEGER PRIMARY KEY, " +
      "shortText VARCHAR(255), fullText VARCHAR(1024), " +
      "folderId BIGINT DEFAULT -1)"
  }

  constructor(sqlite) {
    this.accessor = new SQLiteAccessor(sqlite)
  }

  find(id) {
    return this.accessor.find('PHRASES', id).then((row) => {
      if(row)
        return new Phrase(id, row.shortText, row.fullText, row.folderId)
      else
        throw `phrase with id=${id} does not exist`
    })
  }

  list() {
    return this.accessor.list('PHRASES').then((rows) => {
      const phrases = rows.map((row) => {
          return new Phrase(row.id, row.shortText, row.fullText, row.folderId)
      })
      return phrases
    })
  }

  insert(phrase) {
    const sql = "INSERT INTO PHRASES (shortText, fullText, folderId) VALUES(?, ?, ?)"
    const params = [phrase.shortText, phrase.fullText, phrase.folderId]
    return this.accessor.run(sql, params)
  }

  update(id, phrase) {
    const sql = "UPDATE PHRASES SET shortText = ?, fullText = ? WHERE id = ?"
    const params = [phrase.shortText, phrase.fullText, id]
    return this.accessor.run(sql, params)
  }

  move(id, folderId) {
    const sql = "UPDATE PHRASES SET FOLDERID = ? WHERE id = ?"
    const params = [folderId, id]
    return this.accessor.run(sql, params)
  }

  remove(id) {
    const sql = "DELETE FROM PHRASES WHERE id = ?"
    const params = [id]
    return this.accessor.run(sql, params)
  }

}
