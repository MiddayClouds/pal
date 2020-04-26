// Any module required will be written up here
const Util = require('./../modules/util')
const got = require('got');

/**
 * Command: inspire
 * Description: Outputs a random embed image from inspirobot.
 * */

module.exports = {
	name: 'inspire',
	description: 'Outputs a random embed image from inspirobot.',
	execute(message, args, config) {
    const command = args[0].slice(config.PREFIX.length,)
    const rawArgument = args.join(' ')
    const argument = rawArgument.replace(config.PREFIX + command + ' ', '')

    // Start of command:

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
