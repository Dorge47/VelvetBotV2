# Documentation for the code in our bot

The project is getting big enough that we should add this.

## File list and description
- `botapi.js`
    - Holds all the helper functions such as `sendPhoto()`
- `main.js`
    - Holds the main logic of the program
    - Is ran by the bootloader


## Command structure:

```javascript
//Will require that an admin send this command
this.requires_admin = false;
// All messages will reply
//0 = message
//1 = photo
//2 = captioned photo
//3 = random photo from list
//4 = random photo from list with caption
//5 = animation
//6 = zelda
//7 = forward
//256 = Reserved for the help command
//257 = Reserved for the shutdown command
//258 = Reserved for the adding photos command
//259 = Reserved for the adding captioned photos command
this.command_type = 0;
//This is what the bot will test against
this.command_names = ["test"];
//- When it is a message, it'll contain the string we want to send
//- When it is a photo, it'll contain the fileId
//- When it is a photo that needs a caption, it'll be an object with the
//  photo's caption (command_data.caption) and the fileID (command_data.fileId)
//- When it's a random photo from a list, it'll point to a file that will
//  contain all the file IDs separated by a newline
//- When it's a random photo from a list with captions, it'll point to a file
//  just like when it's a normal random photo, but it'll have a caption which
//  is separated by a pipe (|)
//- When it's an animation, it'll have an object with a caption and a fileID.
//- When it's a link, it'll have an object with the text, the link,
//  and whether it should disable the preview (disablePreview)
//- When it's a forward, it'll have an object with the text to reply with (replyText)
//  and the chatID to forward to (chadId)
this.command_data = "I'm working!";
this.command_description = "Tests pennybot";
```
