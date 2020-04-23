// Any module required will be written up here
const Util = require('./../modules/util')
const Logger = new Util.Logger();

/**
 * Command: rps
 * Description: Plays rps
 * */

module.exports = {
	name: 'rps',
	description: 'Plays RPS',
	execute(message, args, config) {
    // Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

    const paction = args.join(' ')
    const bactions = ['rock', 'scissors', 'paper']
    const ranbaction = bactions[Math.floor(Math.random() * bactions.length)]
    if (!args[0]) {
        message.channel.send('Please provide an action, this can be `rock` `paper` or `scissors`.')
        return
    } else if (paction === ranbaction) {
        message.channel.send('I choose `' + ranbaction + '`!')
        message.reply(":necktie: It's a tie!")
    } else if (ranbaction === 'rock' && paction === 'paper') {
        // User wins.
        message.channel.send('I choose `' + ranbaction + '`!')
        message.reply('You win!')
    } else if (ranbaction === 'scissors' && paction === 'rock') {
        message.channel.send('I choose `' + ranbaction + '`!')
        message.reply('You win!')
    } else if (ranbaction === 'paper' && paction === 'scissors') {
        message.channel.send('I choose `' + ranbaction + '`!')
        message.reply('You win!')
    } else if (ranbaction === 'rock' && paction === 'scissors') {
        // User looses
        message.channel.send('I choose `' + ranbaction + '`!')
        message.reply('You lose!')
    } else if (ranbaction === 'scissors' && paction === 'paper') {
        message.channel.send('I choose `' + ranbaction + '`!')
        message.reply('You lose!')
    } else if (ranbaction === 'paper' && paction === 'rock') {
        message.channel.send('I choose `' + ranbaction + '`!')
        message.reply('You lose!')
    } else {
        message.reply('Please use `rock` `paper` or `scissors`.')
        return
    }

	},
}
