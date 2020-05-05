const Discord = require("discord.js");
const { version } = require("discord.js");
const package = require("./../package.json");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const clientInfo = {
    color: 0x0099ff,
    author: {
      name: client.user.username,
      icon_url: client.user.displayAvatarURL(),
		  url: 'https://github.com/MiddayClouds/pal',
    },
    description: '*If you need help, type **'+client.settings.get("default").prefix+'help***',
    fields: [
      {
        name: 'Github Repository',
			  value: 'https://github.com/MiddayClouds/pal',
		  },
      {
        name: '\u200B',
        value: '\u200B',
      },
		  {
			  name: 'Guilds Serving:',
        value: message.client.guilds.cache.size.toLocaleString(),
        inline: true,
      },
		  {
		  	name: 'Users Serving:',
		  	value: client.getMembers(message.client.guilds),
		  	inline: true,
		  },
      {
        name: '\u200B',
        value: '\u200B',
      },
      {
		  	name: 'Bot Version:',
		  	value: package.version,
        inline: true,
		  },
      {
		  	name: 'Discord.js Version:',
		  	value: 'v'+version,
		  	inline: true,
		  },
      {
        name: 'Node Version:',
        value: process.version,
        inline: true,
      },
      {
        name: '\u200B',
        value: '\u200B',
      },
      {
        name: 'Memory Usage:',
        value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB',
        inline: true,
      },
      {
        name: 'Uptime:',
        value: duration,
        inline: true,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: '© Midday',
      icon_url: 'https://avatars0.githubusercontent.com/u/33847796?s=200&v=4',
    },
  };
  message.channel.send({ embed: clientInfo });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Outputs statistics of the bot for nerds.",
  usage: "stats"
};
