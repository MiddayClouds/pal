const Util = require('./../modules/util')
const Logger = new Util.Logger();
const bot = require('../bot')

/**
 * Command: bot-info
 * Description: Gives you some information about the bot.
 * */
module.exports = {
	name: 'bot-info',
	description: 'Gives you some information about the bot.',
	execute(message, args, config) {
		// Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

		message.channel.send({
			embed: {
				author: {
					name: message.client.user.username,
					icon_url: message.client.user.avatarURL(),
					url: 'https://github.com/MiddayClouds',
				},
				description: `*If you need help, type **${config.PREFIX}help***`,
				color: 15448698,
				fields: [
					{
						name: 'Website:',
						value: 'https://github.com/MiddayClouds',
						inline: false,
					},
					{
						name: 'Servers',
						value: message.client.guilds.cache.size,
						inline: true,
					},
					{
						name: 'Users',
						value: bot.totalMembers(),
						inline: true,
					},
					{
						name: 'Version',
						value: config.VERSION,
						inline: false,
					},
				],
				timestamp: new Date(),
			},
		})
	},
}
