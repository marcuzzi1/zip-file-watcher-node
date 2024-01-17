// Sending Hello World to console to check if script is started
console.log('Hello World from zip-file-watcher-node!');

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

// Using fs
const fs = require('fs');

// Declaring some variables
var lastEvent = null; // Last event recorded
var currentEvent = null; // Current event recorded

// TODO - add path verification (if it exists, if it's a folder, etc.)

// Watching path
fs.watch(`${path}`, (eventType, fileName) => {
    // Managing events
    if (null === lastEvent) {
        lastEvent = eventType; // Registering last event if it wasn't already
        currentEvent = null; // Setting current event to null as well
    } else {
        currentEvent = eventType; // Registering current event

        // We can continue in this case
        if ('rename' === lastEvent && 'change' === currentEvent) { // Checking the event types
            // Checking if file has ".zip" extension and still exists
            if ('zip' === fileName.split('.')[1] && fs.existsSync(`${path}\\${fileName}`)) {
                // CHANGEME - do whatever you want with your file
                console.log(`File '${fileName}' has been added, extracting it...`); // FIXME - change this for better logs in file
            }
            // Otherwise, it doesn't matters for us, so we can set the events to null to avoid any issue (in both cases this piece of code is reached)
            console.log(`Ignoring file or event`); // TODO - remove this after first tests
            lastEvent = null;
            currentEvent = null;
        } else {
            // If event types doesn't match, we can set the events to null to avoid any issue
            lastEvent = null;
            currentEvent = null;
        }
    }
});

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
With some dummies tests I found that:
    -> Adding a file (dragging/copying) will trigger 2 events: rename and change
    -> Deleting a file will trigger 1 event: rename
So, I suggest we proceed as follows:
    -> Register the current event in a variable
    -> Register the next one (during next triggered event) into another variable
    -> Check if last event is rename and current event is change, then:
        -> Check if file has ".zip" extension (could be ".rar" or ".7z" or whatever you need as long as you can adapt it),
        also check if it still exists (because it could've been deleted during the process)
        -> If true, then:
            -> In my case, I need to extract the zip content into the same folder, then delete the zip file
            (You can do whatever you want, feel free to adapt it to your needs)
            -> After all, I put null value in both variables

If you need to adapt the treatment of your file(s) and you don't succeed, feel free to open an issue and if I know
how, it will be a pleasure to help you.

Also, I use to compare with consant before variable, it's an habit, but you can do it the other way around if you want.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/