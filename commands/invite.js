exports.run = (client, message, args, level) => {
  message.channel.send({
    embed: {
      color: 15448698,
      fields: [
        {
          name: 'Bot Invite: ',
					value: '[Click here](https://discordapp.com/oauth2/authorize?&client_id='+ client.id +'&scope=bot&permissions=1007021143) to add the bot to your server.',
          },
        ],
      },
    })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "invite",
  category: "Miscelaneous",
  description: "Outputs a bot invite link",
  usage: "invite"
};
