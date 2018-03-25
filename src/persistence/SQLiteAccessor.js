

export default class SQLiteAccessor {
  constructor(sqlite) {
    this.sqlite = sqlite
  }

  run(sql, params) {
    return this.promisefy((callback) => {
      this.sqlite.run(sql, params, callback)
    })
  }

  beginTransaction() {
    return new Promise((resolve, reject) => {
      this.sqlite.beginTransaction((err, transaction) => {
        if(err) {
          console.log("beginTransaction: transaction begin failed", err)
          return reject(err, transaction)
        }
        resolve(transaction)
      })
    })
  }

  runWithTransaction(transaction, sql, params) {
    return new Promise((resolve, reject) => {
      transaction.run(sql, params, (err, result) => {
        if(err) {
          console.log("runWithTransaction: stmt in transaction failed", err)
          transaction.rollback(()=>{
            console.log('runWithTransaction: transaction rolled back')
          })
          return reject(err, transaction)
        }
        resolve(transaction)
      })
    })
  }

  getWithTransaction(transaction, sql, params) {
    return new Promise((resolve, reject) => {
      transaction.get(sql, params, (err, result) => {
        if(err) {
          console.log("getWithTransaction: stmt in transaction failed", err)
          transaction.rollback(()=>{
            console.log('getWithTransaction: transaction rolled back')
          })
          return reject(err, transaction)
        }
        console.log('getWithTransaction got result: ', result)
        return resolve({transaction:transaction, row: result})
      })
    })
  }

  allWithTransaction(transaction, sql, params) {
    return new Promise((resolve, reject) => {
      transaction.all(sql, params, (err, result) => {
        if(err) {
          console.log("allWithTransaction: stmt in transaction failed", err)
          transaction.rollback(()=>{
            console.log('allWithTransaction: transaction rolled back')
          })
          return reject(err, transaction)
        }
        return resolve({transaction:transaction, rows: result})
      })
    })
  }

  runInTransaction(stmtsWithParams) {
    return new Promise((resolve, reject) => {
      this.sqlite.beginTransaction((err, transaction) => {
        if(err) {
          console.log("beginning transaction failed")
          return reject(err)
        }

        let results = []

        console.log('stmtsWithParams', stmtsWithParams)

        for(let i = 0; i < stmtsWithParams.length; i++)
        {
          const stmtWithParams = stmtsWithParams[i]
          const sql = stmtWithParams.sql
          const params = stmtWithParams.params

          transaction.run(sql, params, (err, ...res) => {
            console.log('executed: ', res)
            if(err) {
              console.log('aborting transaction: ', err)
              transaction.rollback((err) => {
                if(err)
                  console.log('failed to rollback: ', err)
              })
              return reject(err)
            }
            if(res.length > 0)
              results.push(res[0])

            if(i == stmtsWithParams.length - 1)
            {
              transaction.commit((err) => {
                if(err) {
                  console.log('failed to commit: ', err)
                  return reject(err)
                }
                console.log('committed')
                resolve(results)
              })
            }
          })
        }
      })
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
