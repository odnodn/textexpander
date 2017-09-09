const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
 
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1024
  })
 
  // load the local HTML file
  let url = require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: require('path').join(__dirname, 'hotreload.html')
  })
  console.log(url)
  mainWindow.loadURL(url)
  mainWindow.openDevTools();
})
