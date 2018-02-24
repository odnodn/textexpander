import SQLite from '../src/persistence/SQLite'
import Folder from "../src/data/Folder"
import Phrase from "../src/data/Phrase"


const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = require('assert');

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});




describe('sqlite module', () => {
  var sqlite3 = require('sqlite3').verbose()
  var db = null

  beforeEach(function () {
    db = new sqlite3.Database(':memory:')
  })

  afterEach(function () {
    db.close()
  })

  it('basic sqlite operation', function () {
    db.serialize(function() {
      db.run("CREATE TABLE lorem (info TEXT)")

      var stmt = db.prepare("INSERT INTO lorem VALUES (?)")
      for (var i = 0; i < 10; i++) {
          stmt.run("Ipsum " + i)
      }
      stmt.finalize()

      db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
          console.log(row.id + ": " + row.info, row)
      })
    })
  })
})


describe('SQLite object', function () {
  beforeEach(function () {

  })

  afterEach(function () {

  })

  it('basic sqlite operation with folders', function (done) {
    const sqlite = new SQLite()
    sqlite.folders.insert(Folder.create("dummy folder", "dummy description", -1))
    sqlite.folders.insert(Folder.create("dummy folder2", "dummy description2", -1))
    sqlite.folders.find(2).then((folder) => {
      console.log('found folder: ', folder)
    })
    sqlite.folders.list().then((folders) => {
      folders.map((folder) => {
        console.log('found folder: ', folder)
      })
    })

    sqlite.folders.update(1, Folder.create("updated dummy folder", "updated dummy description", -1)).then(() => {
      console.log('updated folder')
    }).catch((err) => {
      console.log('could not update folder: ', err)
      done()
    })

    sqlite.folders.move(1, 2).then(() => {
      console.log('moved folder')
    }).catch((err) => {
      console.log('could not move folder: ', err)
      done()
    })

    sqlite.folders.find(1).then((folder) => {
      console.log('found folder: ', folder)
    })
    sqlite.folders.remove(1).then(() => {
      console.log('removed folder with id=1')
    })
    sqlite.folders.find(1).then((folder) => {
      if(folder)
        console.log('found folder: ', folder)
      else
        console.log('could not find folder')
    }).catch((err) => {
      console.log('could not find folder: ', err)
      done()
    })
    sqlite.close()
  })

  it('basic sqlite operation with phrases', function (done) {
    const sqlite = new SQLite()
    sqlite.phrases.insert(Phrase.create("dummy shortText", "dummy fullText", -1))
    sqlite.phrases.insert(Phrase.create("dummy shortText2", "dummy fullText2", -1))
    sqlite.phrases.find(2).then((phrase) => {
      console.log('found phrase: ', phrase)
    })
    sqlite.phrases.list().then((phrases) => {
      phrases.map((phrase) => {
        console.log('found phrase: ', phrase)
      })
    })

    sqlite.phrases.update(1, Phrase.create("updated dummy phrase", "updated dummy fullText", -1)).then(() => {
      console.log('updated phrase')
    }).catch((err) => {
      console.log('could not update phrase: ', err)
      done()
    })

    sqlite.phrases.move(1, 2).then(() => {
      console.log('moved phrase')
    }).catch((err) => {
      console.log('could not move phrase: ', err)
      done()
    })

    sqlite.phrases.find(1).then((phrase) => {
      console.log('found phrase: ', phrase)
    })
    sqlite.phrases.remove(1).then(() => {
      console.log('removed phrase with id=1')
    })
    sqlite.phrases.find(1).then((phrase) => {
      if(phrase)
        console.log('found phrase: ', phrase)
      else
        console.log('could not find phrase')
    }).catch((err) => {
      console.log('could not find phrase: ', err)
      done()
    })

    sqlite.close()

  })

})
