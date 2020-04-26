const Util = require('./../modules/util')
const bot = require('../bot')

/**
 * Command: bot-info
 * Description: Outputs an embed containing information about the bot..
 * */

module.exports = {
	name: 'bot-info',
	description: 'Outputs an embed containing information about the bot.',
	execute(message, args, config) {
    // Start of command:
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
