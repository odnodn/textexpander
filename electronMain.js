
const {app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, dialog} = require('electron')
const path = require('path')
require("babel-register")

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
      backgroundThrottling: false
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

  const createNewPhrase = (event, arg) => {

  }

  ipcMain.on('submitNewPhrase', createNewPhrase)

  // const toggleMainWindow = (event) => {
  //     if (mainWindow.isVisible()) {
  //       mainWindow.hide()
  //     } else {
  //       mainWindow.show()
  //       if (mainWindow.isVisible() && process.defaultApp) {
  //         mainWindow.openDevTools({mode: 'detach'})
  //       }
  //     }
  // }
  // tray.on('double-click', toggleMainWindow)
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



// const {app, BrowserWindow, ipcMain, Tray, globalShortcut} = require('electron')
// const path = require('path')
//
// const assetsDirectory = path.join(__dirname, 'assets')
//
// let tray = undefined
// let window = undefined
//
// // Don't show the app in the doc
// app.dock.hide()
//
// app.on('ready', () => {
//   createTray()
//   createWindow()
// })
//
// // Quit the app when the window is closed
// app.on('window-all-closed', () => {
//   app.quit()
// })
//
// const createTray = () => {
//   tray = new Tray(path.join(assetsDirectory, 'clipboard.png'))
//   tray.on('right-click', toggleWindow)
//   tray.on('double-click', toggleWindow)
//   tray.on('click', function (event) {
//     toggleWindow()
//
//     // Show devtools when command clicked
//     if (window.isVisible() && process.defaultApp && event.metaKey) {
//       window.openDevTools({mode: 'detach'})
//     }
//   })
//
//
//   globalShortcut.register('CommandOrControl+X', () => {
//     console.log('CommandOrControl+X is pressed')
// 		toggleWindow()
//   })
//
// }
//
// const getWindowPosition = () => {
//   const windowBounds = window.getBounds()
//   const trayBounds = tray.getBounds()
//
//   // Center window horizontally below the tray icon
//   const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
//
//   // Position window 4 pixels vertically below the tray icon
//   const y = Math.round(trayBounds.y + trayBounds.height + 4)
//
//   return {x: x, y: y}
// }
//
// const createWindow = () => {
//   window = new BrowserWindow({
//     width: 300,
//     height: 450,
//     show: false,
//     frame: false,
//     fullscreenable: false,
//     resizable: false,
//     transparent: true,
//     webPreferences: {
//       // Prevents renderer process code from not running when window is
//       // hidden
//       backgroundThrottling: false
//     }
//   })
//   window.loadURL(`file://${path.join(__dirname, 'hotreload.html')}`)
//
//   // Hide the window when it loses focus
//   window.on('blur', () => {
//     if (!window.webContents.isDevToolsOpened()) {
//       window.hide()
//     }
//   })
// }
//
// const toggleWindow = () => {
//   if (window.isVisible()) {
//     window.hide()
//   } else {
//     showWindow()
//   }
// }
//
// const showWindow = () => {
//   const position = getWindowPosition()
//   window.setPosition(position.x, position.y, false)
//   window.show()
//   window.focus()
// }
//
// ipcMain.on('show-window', () => {
//   showWindow()
// })
