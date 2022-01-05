require("dotenv").config();

const { Client, Intents, GuildMember } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  //console.log(`[${message.author.tag}]: ${message.content}`);
  /* if (message.content === 'hello') {
            message.reply('https://media.giphy.com/media/KtnNLZVycYLdutzEm9/giphy.gif');
            //message.channel.send('https://media.giphy.com/media/KtnNLZVycYLdutzEm9/giphy.gif');
        }*/

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      if (!message.member.permissions.has("KICK_MEMBERS"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0)
        return message.reply("Please provide the ID of the offender.");
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) =>
            message.channel.send("I do not have permissions :( ")
          );
      } else {
        message.channel.send("That Member was not found");
      }
    } else if (CMD_NAME === "ban") {
      if (!message.member.permissions.has("BAN_MEMBERS"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0)
        return message.reply("Please provide the ID of the offender.");
      message.guild.members.ban(args[0]);

      try {
        const user = await message.guild.members.ban(args[0]);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
