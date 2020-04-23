// Any module required will be written up here
const Util = require('./../modules/util')
const Logger = new Util.Logger();

/**
 * Command: clap
 * Description: Claps out whatever you input.
 * */

module.exports = {
	name: 'clap',
	description: 'Claps out whatever you input.',
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

    if (!args[1]) {
        message.channel.send('Please :clap: provide :clap: some :clap: text :clap: to :clap: clapify')
        return
    } else {
      const clapstr = argument.split(' ').join(' :clap: ')
      message.channel.send(clapstr)
    }

	},
}
