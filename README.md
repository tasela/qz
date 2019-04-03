# QuoteBot
### A Discord selfbot to add "reply"-like quoting functionality

Notice
------
***Selfbots are something of a gray area in Discord's ToS.*** The general consensus is that you should *not* use them. I'm leaving this repository up mainly as a proof of concept, but I can't claim responsibility if your account is suspended or banned because of it.

Purpose
------
A proof-of-concept for how replying/quoting could work in Discord. This solution is obviously not optimal, but it's a cool way to see how quoting might work in the future (if ever implemented into the Discord client itself).

Using
------
Make sure you have "Developer Mode" enabled in Discord's Appearance settings. Right click the message you want to quote, and click "Copy ID."

Next, type `{quote:` where you want the quote to appear, and paste in the ID. End with `}`.

When you send the message, it will be replaced with the quote! Wow!

Features
------
* Easy, fast quoting
* No annoying error messages when you mess up. Nothing happens.

Limitations
------
* Sort of spammy (bigger guilds might not like you using this)
* Only looks for quotes in the last 50 messages (if the selfbot can't find the message, nothing happens)

Setup
------
Clone/download the repo, and with a working Node installation, run `npm install`.

Rename `config.js.defaults` to `config.js`, and enter your user token (this can be found under Discord's Ctrl-Shift-I menu by Application > Storage > Local Storage and finding the key/value pair with the key `token`) between the quotes.

Now, just run the selfbot with `node index.js`, and as long as the bot is running, you can quote people freely.
