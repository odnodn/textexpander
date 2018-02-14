import Folders from "./Folders"
import Phrases from "./Phrases"

const Datastore = require('nedb')
let instance = null

export default class NeDB
{
  constructor(basedir = "./") {
    if(instance)
      return instance

    const folderDBPath = require('path').join(basedir, 'folders.nedb')
    const phraseDBPath = require('path').join(basedir, 'phrases.nedb')

    this.folderDB = new Datastore({filename : folderDBPath, autoload: true});
    this.phraseDB = new Datastore({filename : phraseDBPath, autoload: true});

    this.folders = new Folders(this.folderDB)
    this.phrases = new Phrases(this.phraseDB)    
    instance = this
  }
}
