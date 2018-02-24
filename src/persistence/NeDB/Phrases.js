import NeDBAccessor from "../NeDBAccessor"

export default class Phrases {
  constructor(neDB) {
    this.accessor = new NeDBAccessor(neDB)
  }

  find(id) {
    return this.accessor.find(id)
  }

  list() {
    return this.accessor.list()
  }

  insert(doc) {
    return this.accessor.insert(doc)
  }

  update(id, doc) {
    return this.accessor.update(id, doc)
  }

  remove(id) {
    return this.accessor.remove(id)
  }

}
