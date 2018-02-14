"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Folders = require("./Folders");

var _Folders2 = _interopRequireDefault(_Folders);

var _Phrases = require("./Phrases");

var _Phrases2 = _interopRequireDefault(_Phrases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Datastore = require('nedb');
var instance = null;

var NeDB = function NeDB() {
  var basedir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "./";

  _classCallCheck(this, NeDB);

  if (instance) return instance;

  var folderDBPath = require('path').join(basedir, 'folders.nedb');
  var phraseDBPath = require('path').join(basedir, 'phrases.nedb');

  this.folderDB = new Datastore({ filename: folderDBPath, autoload: true });
  this.phraseDB = new Datastore({ filename: phraseDBPath, autoload: true });

  this.folders = new _Folders2.default(this.folderDB);
  this.phrases = new _Phrases2.default(this.phraseDB);
  instance = this;
};

exports.default = NeDB;

