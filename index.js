// Defining log element
const log = console.log.bind(console); // TODO - change this for better logs in a file

// Sending Hello World to console to check if script is started
log('Hello World from zip-file-watcher-node!');

// Parsing args
var parsedArgs = require('minimist')(process.argv.slice(2)); // Parse arguments with minimist
var path = parsedArgs.path?.toString() || undefined; // Extracting path to watch (from args)

// Verifying if path is defined (don't ask me why, but it's not working without verifying 'true', must be from minimist...)
// PS: If you have a better idea or a fix, please tell me by opening a PR or an issue
if (path === undefined || path === 'true') {
    console.error(`Path must be defined. Use command like that: npm start "path/to/watch"`); // Fancy error for the user
    // TODO - add this error to a log file
    process.exit(1); // Exit process
}

// Importing modules
const fs = require('fs'); // File system module
const chokidar = require('chokidar'); // chokidar module (file watcher)

// TODO - add path verification (if it exists, if it's a folder, etc.)

// Creating the watcher
const watcher = chokidar.watch(path, { persistent: true, ignoreInitial: true });

// Watching for 'add' event
watcher.on('add', (filePath) => {
    log(`File ${filePath} has been added`);
});