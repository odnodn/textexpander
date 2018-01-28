
const {app, BrowserWindow, ipcMain, Tray, globalShortcut} = require('electron')
const path = require('path')

const startup = () => {
  app.dock.hide()
  const trayWindow = startupTrayWindow()
  startupTray(trayWindow)

  const searchWindow = startupSearchWindow()
  bindShortcut(searchWindow)
}

const startupTray = (trayWindow) => {
  const assetsDirectory = path.join(__dirname, 'assets')
  const trayIcon = 'clipboard.png'

  let tray = new Tray(path.join(assetsDirectory, trayIcon))

  const toggleTrayWindow = () => {
      if (trayWindow.isVisible()) {
        trayWindow.hide()
      } else {
        trayWindow.show()
        if (trayWindow.isVisible() && process.defaultApp) {
          trayWindow.openDevTools({mode: 'detach'})
        }
      }
  }

  tray.on('right-click', toggleTrayWindow)
  tray.on('double-click', toggleTrayWindow)
  tray.on('click', toggleTrayWindow)
}

const startupTrayWindow = () => {
// create browser window hidden
  const rootName = 'trayWindow'
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
      backgroundThrottling: false
    }
  })
  window.loadURL(`file://${path.join(__dirname, 'hotreload.html?root=' + rootName)}`)

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })

  return window
}

const startupSearchWindow = () => {
// create browser window hidden
}

const showSearchWindow = () => {

}



const bindShortcut = () => {
  globalShortcut.register('Alt+Space', () => {
    showSearchWindow()
    var robot = require("robotjs")
    //robot.typeString("Hello World")
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
