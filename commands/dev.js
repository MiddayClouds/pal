// Any module required will be written up here
const Util = require('./../modules/util')
const Logger = new Util.Logger();

/**
 * Command: devs
 * Description: info on the devs
 * */

module.exports = {
	name: 'dev',
	description: 'Information on the devs',
	execute(message, args, config) {
    // Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

    message.delete().catch((e) => {
        Util.betterError(message, `dev Command -> message.delete() -> catch e: ${e}`)
    })
    
    message.author.send('The main developers are: <@134919543691804672>, and <@140806844053454848>.')

	},
}
