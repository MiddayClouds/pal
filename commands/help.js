// Any module required will be written up here
const Util = require('./../modules/util')

/**
 * Command: help
 * Description: Gives out a list of bot commands.
 * */

module.exports = {
	name: 'help',
	description: 'Gives out a list of bot commands.',
	execute(message, args, config) {
    const command = args[0].slice(config.PREFIX.length,)
    const rawArgument = args.join(' ')
    const argument = rawArgument.replace(config.PREFIX + command + ' ', '')

    // Put command here...


    client.getTotalCommands = new Discord.Collection();
    const totalCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    for (const file of totalCommands) {
    	const command = require(`./commands/${file}`);
    	// set a new item in the Collection
    	// with the key as the command name and the value as the exported module
    	client.commands.set(command.name, command);
    	// Check if any alias does exist and add if they do
    	if(command.alias) {
    		for(const alias of command.alias) {
    			client.commands.set(alias, command)
    		}
      }
    }

    console.log(client.getTotalCommands)




	},
}
