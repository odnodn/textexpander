import SQLiteAccessor from "../SQLiteAccessor"
import Folder from "../../data/Folder"

export default class Folders {
  static get CREATE_STATEMENT() {
    // TIP: ID auto increments in SQLITE even without any flag
    return "CREATE TABLE IF NOT EXISTS FOLDERS (id INTEGER PRIMARY KEY, " +
      "name VARCHAR(255), description VARCHAR(1024), " +
      "parentId BIGINT DEFAULT -1, idx INTEGER DEFAULT 0)"
  }

  constructor(sqlite) {
    this.accessor = new SQLiteAccessor(sqlite)
  }

  find(id) {
    return this.accessor.find('FOLDERS', id).then((row) => {
      if(row)
        return new Folder(id, row.name, row.description, row.parentId, row.idx)
      else
        throw `folder with id=${id} does not exist`
    })
  }

  list() {
    return this.accessor.list('FOLDERS').then((rows) => {
      const folders = rows.map((row) => {
          return new Folder(row.id, row.name, row.description, row.parentId, row.idx)
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

  // move(id, parent_id, idx) {
  //   const sql = "UPDATE FOLDERS SET PARENTID = ?, IDX = ? WHERE id = ?"
  //   const params = [parent_id, idx, id]
  //   return this.accessor.run(sql, params)
  // }

  move2(folder, newParentId, newIdx) {
    return this.accessor.runInTransaction([
      {sql:"UPDATE FOLDERS SET IDX=IDX+1 WHERE PARENTID=? and IDX >= ?", params:[newParentId, newIdx]},
      {sql:"UPDATE FOLDERS SET IDX=IDX-1 WHERE PARENTID=? and IDX >= ?", params:[folder.parentId, folder.idx]},
      {sql:"UPDATE FOLDERS SET IDX = ?, PARENTID = ? WHERE id = ?", params:[newIdx, newParentId, folder.id]}
    ])
  }

  move(folder, newParentId, newIdx) {
    // first check folder is in saved position
    // shift other items before moving into
    // pull other items in previous position
    // set the actual folder attributes
    return this.accessor.beginTransaction().then((transaction) => {
      return this.accessor.getWithTransaction(transaction, "SELECT * FROM FOLDERS WHERE ID = ? and PARENTID = ? and IDX = ?", [folder.id, folder.parentId, folder.idx])
    }).then((args) => {
      const transaction = args.transaction
      const row = args.row
      if(row && row.id == folder.id)
        return this.accessor.runWithTransaction(transaction, "UPDATE FOLDERS SET IDX=IDX+1 WHERE PARENTID=? and IDX >= ?", [newParentId, newIdx])
      else {
        transaction.rollback(()=>{})
        throw `cannot proceed folder move. local and remote states are inconsistent: ${folder} vs ${row}`
      }
    } ).then((transaction) => {
      return this.accessor.runWithTransaction(transaction, "UPDATE FOLDERS SET IDX=IDX-1 WHERE PARENTID=? and IDX >= ?", [folder.parentId, folder.idx])
    }).then((transaction) => {
      return this.accessor.runWithTransaction(transaction, "UPDATE FOLDERS SET IDX = ?, PARENTID = ? WHERE id = ?", [newIdx, newParentId, folder.id])
    }).then((transaction) => {
      console.log('folder move succeeded')
      return transaction
    }).catch((err) => {
      console.log('folder move failed: ', err)
    })
  }

  remove(id) {
    const sql = "DELETE FROM FOLDERS WHERE id = ?"
    const params = [id]
    return this.accessor.run(sql, params)
  }

}
