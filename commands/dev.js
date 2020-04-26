// Any module required will be written up here
const Util = require('./../modules/util')

/**
 * Command: devs
 * Description: Information on the devs
 * */

module.exports = {
	name: 'dev',
	description: 'Information on the devs',
	execute(message, args, config) {
    // Start of command:

    message.delete().catch((e) => {
        Util.betterError(message, `dev Command -> message.delete() -> catch e: ${e}`)
    })

    message.author.send('The main developers are: <@134919543691804672>, and <@140806844053454848>.')

	},
}
