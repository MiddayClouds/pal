// Any module required will be written up here
const Util = require('./../modules/util')
const Logger = new Util.Logger();
const dataRequest = require('./../modules/datarequest');

/**
 * Command: NAME
 * Description: DESCRIPTION
 * */

module.exports = {
	name: 'wiki',
	description: 'DESCRIPTION',
	execute(message, args, config) {
    // Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

    const command = args[0].slice(config.PREFIX.length,)

    if (!args[1]) {
        message.react('👎').catch((e) => {
            Util.betterError(message, `Wiki Command -> !args[0] -> message.react -> catch e: ${e}`)
        })
        message.reply('you forgot to send us something to get data.``' + config.prefix + 'wiki [argument] | Example ' + config.prefix + 'wiki Rocket League``')
    } else {
        let searchValue = args.toString().replace(/,/g, ' ')
        searchValue = searchValue.replace(config.PREFIX + command + ' ', '')
        let url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=' + searchValue
        dataRequest.getWikipediaSummary(url, message, searchValue)
    }

	},
}
