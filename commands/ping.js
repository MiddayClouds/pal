// Any module required will be written up here
const Util = require('./../modules/util')
const Logger = new Util.Logger();

/**
 * Command: ping
 * Description: pongs
 * */

module.exports = {
	name: 'ping',
	description: 'pongs',
	execute(message, args, config) {
    // Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

    const pings = ['the moon.', 'europe.', 'oceania.', 'Trump.', 'a baguette.', 'pizza.', 'the Netherlands.', 'September 11th, 2001.', 'Google.', 'the BBC.', 'my mother.', 'Mr. Meeseeks.', "pewdipie's firewatch stream.", 'uncensored hentai.', 'Julian Assange.', 'Vine.']
    const ranQuote = pings[Math.floor(Math.random() * pings.length)]
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip).
    const m = message.channel.send('One second...')
    m.edit('It took ` ' + (m.createdTimestamp - message.createdTimestamp) + ' ms ` to :ping_pong: ' + ranQuote + '.')

	},
}
