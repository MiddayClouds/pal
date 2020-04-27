// Any module required will be written up here
const Util = require('./../modules/util')
const repo = "/home/midday/pal";
const exec = require('child_process').exec;

/**
 * Command: update
 * Description: PRIVATE COMMAND
 * */

module.exports = {
	name: 'update',
	description: 'PRIVATE',
	execute(message, args, config) {
    const command = args[0].slice(config.PREFIX.length,)
    const rawArgument = args.join(' ')
    const argument = rawArgument.replace(config.PREFIX + command + ' ', '')
    if (message.author.id == '134919543691804672'){
      //exec('cd ' + repo + ' && git pull origin main');
      //exec('pm2 restart pal');
      message.reply('Sup bro')
    } else {
      message.reply('You are not allowed to preform that command.')
    }
    // Put command here...
	},
}
