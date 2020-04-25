// Any module required will be written up here
const Util = require('./../modules/util')
const Logger = new Util.Logger();
const got = require('got');

/**
 * Command: NAME
 * Description: DESCRIPTION
 * */

module.exports = {
	name: 'inspire',
	description: 'Gets user inspired',
	execute(message, args, config) {
    const command = args[0].slice(config.PREFIX.length,)
    const rawArgument = args.join(' ')
    const argument = rawArgument.replace(config.PREFIX + command + ' ', '')

    // Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

    got('http://inspirobot.me/api?generate=true').then((res) => {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        message.channel.send(
            {
                files: [
                    res.body
                ]
            })
    })

	},
}
