const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect: true});
const config = require("./config.js");

let quoteRegex = /{quote:([0-9]+)}/gi;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}`);
});

client.on("message", (message) => {
  if(message.author.id === client.user.id) //don't worry about type differences, just check that ids are equal
  {
    let match;
    let quotes = [];
    while((match = quoteRegex.exec(message.content)) !== null)
    {
      if(match && match[1]) quotes.push(match[1]);
    }

    let channel = message.channel;
    let content = message.content;
    let quotedMessages = [];
    //verify quotes
    channel.fetchMessages({limit: 50}).then((messages) => {
      for(let messageId of quotes)
      {
        if(messages.has(messageId))
        {
          quotedMessages.push(messages.get(messageId));
        }else {
          //remove quote from message so it can be chunked correctly
          content.replace(new RegExp(`{quote:${messageId}}`, "i"), "");
        }
      }

      if(quotedMessages.length >= 1) //don't do anything if there are no messages that can be successfully quoted
      {
        let splitMessage = content.split(/{quote:[0-9]+}/gi); //split into chunks of text without quotes
        message.delete().catch(console.error);

        for(let i = 0; i < splitMessage.length; i++)
        {
          let chunk = splitMessage[i];
          let quotedMessage = quotedMessages[i];
          if(quotedMessage)
          {
            channel.sendMessage(chunk, {embed: {
              author: {
                name: `${quotedMessage.author.username} said:`,
                icon_url: quotedMessage.author.avatarURL ? quotedMessage.author.avatarURL : undefined
              },
              description: quotedMessage.content
            }});
          } else if(chunk !== ""){
            channel.sendMessage(chunk);
          }
        }
      }
    });
  }
});

client.login(config.token);
