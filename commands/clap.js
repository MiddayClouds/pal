// Any module required will be written up here
const Util = require('./../modules/util')

/**
 * Command: clap
 * Description: Will output your input replacing the spaces with clapping emojis.
 * */

module.exports = {
	name: 'clap',
	description: 'Will output your input replacing the spaces with clapping emojis',
	execute(message, args, config) {
    const command = args[0].slice(config.PREFIX.length,)
    const rawArgument = args.join(' ')
    const argument = rawArgument.replace(config.PREFIX + command + ' ', '')

    // Start of command:
    if (!args[1]) {
        message.channel.send('Please :clap: provide :clap: some :clap: text :clap: to :clap: clapify')
        return
    } else {
      const clapstr = argument.split(' ').join(' :clap: ')
      message.channel.send(clapstr)
    }

	},
}
