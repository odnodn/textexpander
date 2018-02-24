import SQLiteAccessor from "../SQLiteAccessor"
import Folder from "../../data/Folder"

export default class Folders {
  static get CREATE_STATEMENT() {
    // TIP: ID auto increments in SQLITE even without any flag
    return "CREATE TABLE IF NOT EXISTS FOLDERS (id INTEGER PRIMARY KEY, " +
      "name VARCHAR(255), description VARCHAR(1024), " +
      "parentId BIGINT DEFAULT -1)"
  }

  constructor(sqlite) {
    this.accessor = new SQLiteAccessor(sqlite)
  }

  find(id) {
    return this.accessor.find('FOLDERS', id).then((row) => {      
      if(row)
        return new Folder(id, row.name, row.description, row.parentId)
      else
        throw `folder with id=${id} does not exist`
    })
  }

  list() {
    return this.accessor.list('FOLDERS').then((rows) => {
      const folders = rows.map((row) => {
          return new Folder(row.id, row.name, row.description, row.parentId)
      })
      return folders
    })
  }

  insert(folder) {
    const sql = "INSERT INTO FOLDERS (name, description, parentId) VALUES(?, ?, ?)"
    const params = [folder.name, folder.description, folder.parentId]
    return this.accessor.run(sql, params)
  }

  update(id, folder) {
    const sql = "UPDATE FOLDERS SET name = ?, description = ? WHERE id = ?"
    const params = [folder.name, folder.description, id]
    return this.accessor.run(sql, params)
  }

  move(id, parent_id) {
    const sql = "UPDATE FOLDERS SET PARENTID = ? WHERE id = ?"
    const params = [parent_id, id]
    return this.accessor.run(sql, params)
  }

  remove(id) {
    const sql = "DELETE FROM FOLDERS WHERE id = ?"
    const params = [id]
    return this.accessor.run(sql, params)
  }

}
