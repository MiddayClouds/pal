const Util = require('./../modules/util')

/**
 * Command: invite
 * Description: Outputs an embed containing an invite to add the bot to your own server.
 * */
 
module.exports = {
	name: 'invite',
	description: 'Outputs an embed containing an invite to add the bot to your own server',
	execute(message, args, config) {
    // Start of command:

		message.channel.send({
			embed: {
				color: 15448698,
				title: message.client.user.username,
				fields: [
					{
						name: 'Invite: ',
						value: '[Click here](https://discordapp.com/oauth2/authorize?&client_id=300955174225051650&scope=bot&permissions=1007021143) to add the bot to your server.',
					},
				],
			},
		})
	},
}
