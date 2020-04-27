// Any module required will be written up here
const Util = require('./../modules/util')

const fs = require('fs');
/**
 * Command: help
 * Description: Gives out a list of bot commands.
 * */

module.exports = {
	name: 'help',
	description: 'Gives out a list of bot commands.',
	execute(message, args, config) {
    const data = [];
    const { commands } = message.client;
    const rawCommand = args[0].slice(config.PREFIX.length,)
    const rawArgument = args.join(' ')
    const argument = rawArgument.replace(config.PREFIX + rawCommand + ' ', '')
/*
    function getCommandName(amount){
      commands.forEach(command => command.name)
    }
*/

    if (!args[1]) {
      data.push('Here\'s a list of all my commands:');
      data.push(commands.map(command => command.name).join(', '));


      //console.log(commands)
      //commands.map(c => console.log(c.name))
      //console.log(commands.map(command => command.name))

      for (var i = 0; i < c.names.length; i++) {
        const lengthOFNAMES = c.names.length
        console.log(c.names[i])
      }

      data.push(`\nYou can send \`${config.PREFIX}help [command name]\` to get info on a specific command.`);

      return message.author.send(data, { split: true })
      .then(() => {
        if (message.channel.type === 'dm') return;
        message.reply('I\'ve sent you a DM with all my commands!');
      })
      .catch(error => {
        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        message.reply('it seems like I can\'t DM you!');
      });
    }


    if (argument == 'all'){
      const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Some title')
	    .setURL('https://discord.js.org/')
	    .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	    .setDescription('Some description here')
	    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      /*commands.map(c => {
        for (var i = 0; i < c.names.length; i++) {
          const lengthOFNAMES = c.names.length
         .addField(c.names[i], 'Some value here')
        }
      }) */
      .addField('Inline field title', 'Some value here', true)
	    .setImage('https://i.imgur.com/wSTFkRM.png')
	    .setTimestamp()
	    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
      message.channel.send(exampleEmbed)
    }

    const name = argument.toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${config.PREFIX}${command.name} ${command.usage}`);

		//data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });

	},
}
