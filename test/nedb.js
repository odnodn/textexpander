import Folders from '../src/persistence/NeDB/Folders';
import NeDB from '../src/persistence/NeDB'
import Folder from '../src/data/Folder';


const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = require('assert');


global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

const testdbPath = 'test/test.nedb'


describe('nedb basic', function () {

  beforeEach(function () {

  })

  afterEach(function () {

  })

  it('initialize in-memory db', function () {
    var Datastore = require('nedb')
    var db = new Datastore()
    return true
  })

  it('initialize file-based db manual loaded', (done) => {
    var Datastore = require('nedb')
    var db = new Datastore({ filename: testdbPath })
    db.loadDatabase((err) => {
      if(err)
        done(err)
      else
        done()
    });

  })

  it('initialize file-based db auto loaded', () => {
    var Datastore = require('nedb')
    var db = new Datastore({ filename: testdbPath, autoload: true })
  })

})


describe('nedb insertion', function () {

  beforeEach(() => {

  })

  afterEach(() => {

  })

  it('nedb insert', (done) => {
    var Datastore = require('nedb');
    var users = new Datastore();

    var scott = {
        name: 'Scott',
        twitter: '@ScottWRobinson'
    };

    users.insert(scott, (err, doc) => {
        done(err)
    });
    return true;
  })

  it('close', () => {
    return;
  })
})

describe('Folders', () => {
  const Datastore = require('nedb');
  const nedb = new Datastore();

  it('insert and find', (done) => {
    const folders = new Folders(nedb)
    folders.insert(new Folder('General', 'general phrases')).then((doc) => {
      folders.find(doc._id).then((doc) => {
        console.log('found', doc)
        done()
      })
    })
  })

  it('insert and remove', (done) => {
    const folders = new Folders(nedb)
    folders.insert(new Folder('C++', 'C++ development')).then((doc) => {
      return folders.remove(doc._id)
    }).then((numRemoved) => {
      console.log('numRemoved', numRemoved)
      done()
    })
  })

  it('insert and update', (done) => {
    const folders = new Folders(nedb)
    folders.insert(new Folder('Java', 'Java development')).then((doc) => {
      return folders.update(doc._id, new Folder('Java', 'Phrases for Java'))
    }).then((numAffected) => {
      console.log('numAffected: ', numAffected)
      done()
    })
  })
})


describe('NeDB class', () => {
  const neDB = new NeDB('./test/')
  const folders = neDB.folders

  it('insert and find', (done) => {
    folders.insert(new Folder('Python', 'python phrases')).then((doc) => {
      folders.find(doc._id).then((doc) => {
        console.log('found', doc)
        done()
      })
    }).catch((err) => {
      console.error(err);
    })

  })

  it('insert and remove', (done) => {
    folders.insert(new Folder('Python', 'python phrases')).then((doc) => {
      return folders.remove(doc._id)
    }).then((numRemoved) => {
      console.log('numRemoved', numRemoved)
      done()
    })
  })

  it('insert and update', (done) => {
    folders.insert(new Folder('todoist', 'todo app')).then((doc) => {
      return folders.update(doc._id, new Folder('willingtodo', 'todo app'))
    }).then((numAffected) => {
      console.log('numAffected: ', numAffected)
      done()
    })
  })


})
