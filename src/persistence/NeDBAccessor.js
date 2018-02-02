

export default class NeDBAccessor {
  constructor(nedb) {
    this.nedb = nedb
  }

  find(id) {
    return this.findOne({ _id: id })
  }

  list() {
    return this.findAll({})
  }

  insert(doc) {
    return this.promisefy((callback) =>{
      this.nedb.insert(doc, callback)
    })
  }

  update(id, doc) {
    return this.promisefy((callback) => {
      this.nedb.update({_id: id}, doc, {}, callback)
    })
  }

  remove(id) {
    return this.promisefy((callback) => {
      this.nedb.remove({_id: id}, {}, callback)
    })
  }


  findOne(query) {
    return this.promisefy((callback) => {
      this.nedb.findOne(query, callback)
    })
  }

  findAll(query) {
    return this.promisefy((callback) => {
      this.nedb.find(query, callback)
    })
  }

  promisefy(funcWithCallback) {
    return new Promise((resolve, reject) => {
      funcWithCallback((err, ...res) => {
        if(err) {
          reject(err)
        }
        else {
          resolve(...res)
        }
      })
    })
  }

}
