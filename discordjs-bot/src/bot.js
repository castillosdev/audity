require('dotenv').config();

const { Client, Intents, GuildMember, ReactionEmoji } = require('discord.js');
const client = new Client( 
  {
  partials: ['MESSAGE' , 'REACTON'],
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const PREFIX = '$';

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on('messageCreate', async (message) => {
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
//KICK AND BAN 
    if (CMD_NAME === 'kick') {
      if (!message.member.permissions.has('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      if (args.length === 0)
        return message.reply('Please provide the ID of the offender.');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) =>
            message.channel.send('I do not have permissions :( ')
          );
      } else {
        message.channel.send('That Member was not found');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.permissions.has('BAN_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      if (args.length === 0)
        return message.reply('Please provide the ID of the offender.');
      message.guild.members.ban(args[0]);

      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was banned successfully.');
        console.log(user);
      } catch (err) {
        console.log(err);
        message.channel.send('An error occured. Either I do not have permission or the user was not found.')
      }
    }
  }
});

//Reactions Roles
client.on('messageReactionAdd', (reaction, user) => {
  console.log('Whats Gud');
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '928504577475616819') {
    switch (name) {
      case '🎵':
        member.roles.add('928503338683748352');
        break;
      case '📖':
        member.roles.add('928503897251782698');
        break;
      case '🎮':
        member.roles.add('928503941430407168');
        break;
      case '🖌️':
        member.roles.add('928503384561053847');
        break;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
