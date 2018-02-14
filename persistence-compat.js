import Folders from './src/persistence/Folders'
import Phrases from './src/persistence/Phrases'
import NeDB from './src/persistence/NeDB'
import Folder from './src/data/Folder'
import Phrase from './src/data/Phrase'

const neDB = new NeDB('./db/')
var phrases = neDB.phrases
console.log(phrases)

const createNewPhrase = () => {

}

const listPhrases = () => {
  return phrases
}


module.exports = {
  createNewPhrase: createNewPhrase,
  listPhrases: listPhrases
}
