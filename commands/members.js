// Any module required will be written up here
const Util = require('./../modules/util')
const Logger = new Util.Logger();
const util = require('./../modules/util');

/**
 * Command: NAME
 * Description: DESCRIPTION
 * */

module.exports = {
	name: 'members',
	description: 'DESCRIPTION',
	execute(message, args, config) {
    // Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

    let memberAmount = message.guild.memberCount
    let lengthNumber = memberAmount.toString().length

    // Output the "10" emoji when the discord has exact 10 members
    if (memberAmount % 10 === 0) {
        message.react('🔟').catch((e) => {
            Util.betterError(message, `server-members -> msg.react (10) -> catch e: ${e}`)
        })
    } else {
        util.loop(0, lengthNumber, memberAmount.toString(), message)
    }
    message.channel.send('On this discord server there are **' + memberAmount + '** members including yourself (bots included).')

	},
}
