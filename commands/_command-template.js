// Any module required will be written up here
const Util = require('./../modules/util')

/**
 * Command: NAME
 * Description: DESCRIPTION
 * */

module.exports = {
	name: 'NAME',
	description: 'DESCRIPTION',
	execute(message, args, config) {
    // Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

    // Put command here...

	},
}
