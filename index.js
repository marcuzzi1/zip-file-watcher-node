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
fs.watch(`${path}`, (eventType, fileName) => {
    console.log(eventType, fileName); // Log event type and file name
});

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/