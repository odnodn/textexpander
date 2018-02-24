

export default class SQLiteAccessor {
  constructor(sqlite) {
    this.sqlite = sqlite
  }

  run(sql, params) {
    return this.promisefy((callback) => {
      this.sqlite.run(sql, params, callback)
    })
  }

  find(tableName, id) {
    let sql  = `SELECT * FROM ${tableName} where id = ?`
    return this.findOne(sql, [id])
  }

  list(tableName) {
    let sql  = `SELECT * FROM ${tableName}`
    return this.findAll(sql, [])
  }


  findOne(sql, params) {
    return this.promisefy((callback) => {
      this.sqlite.get(sql, params, callback)
    })
  }

  findAll(sql, params) {
    return this.promisefy((callback) => {
      this.sqlite.all(sql, params, callback)
    })
  }

  findEach(sql, params) {
    return this.promisefy((callback) => {
      this.sqlite.each(sql, params, callback)
    })
  }

  promisefy(funcWithCallback) {
    return new Promise((resolve, reject) => {
      return funcWithCallback(function(err, ...res){
        if(err) {
          return reject(err)
        }
        else {
          if(res.length > 0)
            return resolve(...res, this)
          else {
            return resolve(undefined, this)
          }
        }
      })
    })
  }

}
