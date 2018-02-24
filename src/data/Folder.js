

export default class Folder
{
  constructor(id, name, description, parentId) {
    this.id = id
    this.name = name
    this.description = description
    this.parentId = parentId
    this.subfolders = [] // TODO
  }

  static create(name, description, parentId) {
    let folder = new Folder(-1, name, description, parentId)
    return folder
  }
}
