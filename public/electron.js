/* eslint-disable no-shadow */
// Module to control the application lifecycle and the native browser window.
const {
  app, BrowserWindow, protocol, ipcMain,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('electron');
const { is } = require('electron-util');
const Store = require('electron-store');
const path = require('path');
const url = require('url');
const TrayGenerator = require('./TrayGenerator');

let mainWindow = null;
let Tray = null;

// Create the native browser window.
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      devTools: is.development,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
    : 'http://localhost:3000';
  mainWindow.loadURL(appURL);

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    'file',
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      // eslint-disable-next-line no-console
      if (error) console.error('Failed to register protocol');
    },
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow();
//   Tray = new TrayGenerator(mainWindow);
//   Tray.createTray();
//   setupLocalFilesNormalizerProxy();

//   app.dock.hide();

//   app.on("activate", function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

app.on('ready', () => {
  createWindow();
  Tray = new TrayGenerator(mainWindow);
  Tray.createTray();
  setupLocalFilesNormalizerProxy();

  app.dock.hide();
});

const schema = {
  workTime: {
    type: 'number',
    maximum: 3600,
    minimum: 0,
    default: 1500,
  },
  breakTime: {
    type: 'number',
    maximum: 3600,
    minimum: 0,
    default: 300,
  },
  totalPomodoros: {
    type: 'number',
    maximum: 10,
    minimum: 0,
    default: 8,
  },
};

const store = new Store({ schema });

ipcMain.on('electron-store-get', async (event, val) => {
  // eslint-disable-next-line no-param-reassign
  event.returnValue = store.get(val);
});

ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = 'https://my-electron-app.com';
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
