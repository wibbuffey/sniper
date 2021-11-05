const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}!`);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (newMessage.author.bot) {
    return;
  }

  newMessage.channel.send({
    embeds: [
      {
        title: "A message was edited!",
        author: {
          name: newMessage.author.tag,
          icon_url: newMessage.author.avatarURL(),
        },
        description: oldMessage.content,
      },
    ],
  });
});

client.on("messageDelete", (message) => {
  if (message.author.bot) {
    return;
  }

  message.channel.send({
    embeds: [
      {
        title: "A message was deleted!",
        author: {
          name: message.member.user.tag,
          icon_url: message.member.user.avatarURL(),
        },
        description: message.content,
      },
    ],
  });
});

client.login(process.env.BOT_TOKEN);
