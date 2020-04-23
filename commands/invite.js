const Util = require('./../modules/util')
const Logger = new Util.Logger();

/**
 * Command: invite
 * Description: The invite command.
 * */
module.exports = {
	name: 'invite',
	description: 'The invite command.',
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
				color: 15448698,
				title: message.client.user.username,
				fields: [
					{
						name: 'Invite: ',
						value: '[Click here](https://discordapp.com/oauth2/authorize?&client_id=300955174225051650&scope=bot&permissions=1878522945) to add the bot to your server.',
					},
				],
			},
		})
	},
}
