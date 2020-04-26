// Any module required will be written up here
const Util = require('./../modules/util')

/**
 * Command: rps
 * Description: Plays rock, paper, scissors with you.
 * */

module.exports = {
	name: 'rps',
	description: 'Plays rock, paper, scissors with you.',
	execute(message, args, config) {

    // Start of command:

    const command = args[0].slice(config.PREFIX.length,)
    const argument = args.join(' ')
    const paction = argument.replace(config.PREFIX + command + ' ', '')
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
