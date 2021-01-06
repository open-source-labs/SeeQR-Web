"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import parts of electron to use
var electron_1 = require("electron");
var path_1 = require("path");
var url_1 = require("url");
require("./channels"); // all channels live here - this format signals that we want to import the code even if we're not calling any of the functions. If we were to import an object from channels and not call any of the functions in this file, webpack thinks we're not using it and skips the import.
//import execute from './channels';
var exec = require('child_process').exec;
var appMenu = require('./mainMenu'); // use appMenu to add options in top menu bar of app
var path = require('path');
/************************************************************
 *********** PACKAGE ELECTRON APP FOR DEPLOYMENT ***********
 ************************************************************/
// Uncomment to package electron app. Ensures path is correct for MacOS within inherited shell.
// const fixPath = require('fix-path');
// fixPath();
/************************************************************
 ****************** CREATE & CLOSE WINDOW ******************
 ************************************************************/
// Keep a global reference of the window objects, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
//global variable to determine whether or not containers are still running
var pruned = false;
var mainMenu = electron_1.Menu.buildFromTemplate(require('./mainMenu'));
// Keep a reference for dev mode
var dev = false;
if (process.env.NODE_ENV !== undefined &&
    process.env.NODE_ENV === 'development') {
    dev = true;
}
// Create browser window
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1800,
        height: 1400,
        minWidth: 900,
        minHeight: 720,
        title: 'SeeQR',
        show: false,
        webPreferences: { nodeIntegration: true, enableRemoteModule: true },
        icon: path.join(__dirname, '../../frontend/assets/images/seeqr_dock.png'),
    });
    if (process.platform === 'darwin') {
        electron_1.app.dock.setIcon(path.join(__dirname, '../../frontend/assets/images/seeqr_dock.png'));
    }
    // Load index.html of the app
    var indexPath;
    if (dev && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url_1.format({
            protocol: 'http:',
            host: 'localhost:8080',
            pathname: 'index.html',
            slashes: true,
        });
        mainWindow.webContents.openDevTools();
        electron_1.Menu.setApplicationMenu(mainMenu);
    }
    else {
        // In production mode, load the bundled version of index.html inside the dist folder.
        indexPath = url_1.format({
            protocol: 'file:',
            pathname: path_1.join(__dirname, '../../dist', 'index.html'),
            slashes: true,
        });
    }
    mainWindow.loadURL(indexPath);
    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', function (event) {
        mainWindow.show();
    });
}
// ----
electron_1.app.on('before-quit', function (event) { });
// ----
// Invoke createWindow to create browser windows after Electron has been initialized.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
exports.default = mainWindow;
//# sourceMappingURL=main.js.map