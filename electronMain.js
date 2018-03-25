
const {app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, dialog} = require('electron')

const path = require('path')
require("babel-register")
const SQLite = require(path.join(__dirname, 'src/persistence/SQLite.js')).default
const Phrase = require(path.join(__dirname, 'src/data/Phrase.js')).default
const Folder = require(path.join(__dirname, 'src/data/Folder.js')).default
const db = new SQLite('./db/default.sqlite')


const createMainWindow = () => {
  // create browser window hidden
  const rootName = 'mainIndex'
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: true,
    fullscreenable: false,
    resizable: true,
    transparent: false,
    title: 'Manage Phrases',
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false,
      preload: __dirname + '/preload.js'
    }
  })
  window.loadURL(`file://${path.join(__dirname, 'hotreload.html?root=' + rootName)}`)
  window.on('close', () => {
    app.dock.hide()
  })
  return window
}

class WindowHandle
{
  constructor(lazy) {
    if(!lazy)
      this.window = createMainWindow()
  }

  show() {
    this.createIfNeeded()
    this.window.show()
    this.window.openDevTools({mode: 'detach'})
    app.dock.show()
  }

  hide() {
    this.createIfNeeded()
    this.window.hide()
  }

  createIfNeeded() {
    if(this.window == undefined || this.window.isDestroyed()) {
      this.window = createMainWindow()
      this.window.on('closed', () => {
        this.window = undefined
      })
    }
  }
}

const startup = () => {
  app.dock.hide()


  const mainWindow = startupMainWindow()
  startupTray(mainWindow)

  const searchWindow = startupSearchWindow()
  bindShortcut(searchWindow)
}

const startupTray = (mainWindow) => {
  const assetsDirectory = path.join(__dirname, 'assets')
  const trayIcon = 'clipboard.png'

  let tray = new Tray(path.join(assetsDirectory, trayIcon))

  const contextMenu = Menu.buildFromTemplate([
    {label: 'About', click() {
      dialog.showMessageBox(
        { message: "Text Expander 0.1",
          buttons: ["OK"] })
    }},
    {label: 'Manage Phrases', click() {
      mainWindow.show()
    }},
    {label: 'New Phrase...'},
    {label: 'Quit'}
  ])
  tray.setToolTip('Text Expander')
  tray.setContextMenu(contextMenu)

  const createNewPhrase = (event, form) => {
    db.phrases.insert(Phrase.create(form.shortText, form.fullText, form.folderId))
      .then((doc) => {
      event.sender.send('createdPhrase', doc)
    })
  }

  const createNewFolder = (event, form) => {
    db.folders.insert(Folder.create(form.name, form.description, form.parentId))
      .then((doc) => {
      event.sender.send('createdFolder', doc)
    })
  }

  const loadData = (event) => {
    db.phrases.list().then((phrases) => {
      db.folders.list().then((folders) => {
        event.sender.send('loadData', {folders:folders, phrases:phrases})
      })
    })
  }

  ipcMain.on('submitNewPhrase', createNewPhrase)
  ipcMain.on('submitNewFolder', createNewFolder)
  ipcMain.on('loadData', loadData)
}


const startupMainWindow = () => {
  return new WindowHandle()
}

const startupSearchWindow = () => {
  // create browser window hidden
  const rootName = 'searchIndex'
  const window = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false,
      preload: __dirname + '/preload.js'
    }
  })
  window.loadURL(`file://${path.join(__dirname, 'hotreload.html?root=' + rootName)}`)

  // Hide the window when it loses focus
  window.on('blur', () => {
    window.hide()
  })

  const pasteText = (event, arg) => {
    app.hide() // returns focus to previous application (tested on Mac)
    var robot = require("robotjs")
    robot.typeString(arg)
  }

  ipcMain.on('pasteText', pasteText)

  return window
}

const showSearchWindow = (searchWindow) => {
  searchWindow.show()
  if (process.defaultApp) {
    searchWindow.openDevTools({mode: 'detach'})
  }
}

const bindShortcut = (searchWindow) => {
  globalShortcut.register('Alt+Space', () => {
    showSearchWindow(searchWindow)
  })
}

app.on('ready', () => {
  startup()
})
