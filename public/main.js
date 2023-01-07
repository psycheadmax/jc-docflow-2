const { app, BrowserWindow } = require('electron')

require('@electron/remote/main').initialize()

function createWindow() {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }, 
  })
  
    win.loadURL('http://localhost:3000')
  }
  
  app.on('ready', createWindow)

    // custom logic for macOS
    // quit when all windows are closed
    app.on('window-all-closed', function() {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  