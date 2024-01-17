// Parsing args
var parsedArgs = require('minimist')(process.argv.slice(2)); // Parse arguments with minimist
var path = parsedArgs.path.toString() || undefined; // Extracting path to watch (from args)

// Verifying if path is defined (don't ask me why, but it's not working without verifying 'true', must be from minimist...)
// PS: If you have a better idea or a fix, please tell me by opening a PR or an issue
if (path === undefined || path === 'true') {
    console.error(`Path must be defined. Use command like that: npm start "path/to/watch"`); // Fancy error for the user
    process.exit(1); // Exit process
}

// Using fs
const fs = require('fs');

// Watching path
fs.watch(`${path}/*.zip`, (eventType, fileName) => {
    console.log(eventType, fileName); // Log event type and file name
});