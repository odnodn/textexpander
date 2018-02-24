
export default class TreeBuilder
{
  // -1 -> [folder1, folder2]
  // 1 -> [folder3, folder4]
  //
  constructor() {
    this.folder_dictionary = {"-1":[]}
    this.phrase_dictionary = {"-1":[]}
  }

  addFolder(folder) {
    this.folder_dictionary[folder.id] = []
    this.phrase_dictionary[folder.id] = []
    this.addToFolderDictionary(folder.parentId, folder)
  }

  addPhrase(phrase) {
    this.addToPhraseDictionary(phrase.folderId, phrase)
  }

  addToFolderDictionary(id, folder) {
    console.log('addToFolderDictionary', id, folder)
    if(!this.folder_dictionary[id])
    {
      this.folder_dictionary[id] = []
    }

    this.folder_dictionary[id].push(folder)
  }

  addToPhraseDictionary(id, phrase) {
    console.log('addToPhraseDictionary', id, phrase)
    if(!this.phrase_dictionary[id])
    {
      this.phrase_dictionary[id] = []
    }

    this.phrase_dictionary[id].push(phrase)
  }

  toTreeData(rootId = -1) {
    // start from root (-1)
    console.log('toTreeData', rootId)
    const folders = this.folder_dictionary[rootId].map((folder) => {
      const title = folder.name
      const children = this.toTreeData(folder.id)
      return { title: title, children: children, expanded:true }
    })

    const phrases = this.phrase_dictionary[rootId].map((phrase) => {
      const title = phrase.shortText
      return { title: title }
    })

    return folders.concat(phrases)
  }
}
