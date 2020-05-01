/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

exports.run = (client, message, args, level) => {
  const Discord = require("discord.js");

  const helpInfoEmbed = new Discord.MessageEmbed()

  // If no specific command is called, show all filtered commands.
  if (!args[0]) {

    // Set basic embed options
    helpInfoEmbed.setColor('#00FDFF')
    helpInfoEmbed.setTitle('Command List:')
    helpInfoEmbed.setDescription('Use ' + message.settings.prefix + 'help <commandname> for details.')
    helpInfoEmbed.addField("\u200B","\u200B")
    helpInfoEmbed.setAuthor(client.user.name, client.user.displayAvatarURL())
    helpInfoEmbed.setFooter('© Midday','https://avatars0.githubusercontent.com/u/33847796?s=200&v=4')

    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let command = [];
    let possibleCategories = [];
    let allCommandsInfo = []

    // Set all of the commands and categories as sorted
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    // Repeat for all of sorted commands
    sorted.forEach( c => {
      // Make cat the first category found.
      const cat = c.help.category.toProperCase();
      // Set the first command
      const currentCommand = `${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} --> ${c.help.description}\n`;
      if (currentCategory !== cat) {
        // Add all possible categories
        possibleCategories.push(cat);

        // Change the current category to what it is on now
        currentCategory = cat;
      }
      // Push all the possible Categories and Commands in one multidimentional array
      allCommandsInfo.push([cat, currentCommand]);
    });

    // Create function for printing commands as it is much easier
    function printCommands(remove, array) {
      let command = ``
      // Repeat for the lenght of the given array
      for (var i = 0; i < array.length; i++) {
        // console.log(array[i])
        // console.log(array[i][0])

        // Do not do anything if the array description matches remove array
        if (array[i][0] == remove) {

        } else {

          // Otherwise add it to command
          command += `${array[i][1]}\n`
        }
      }

      // Return the command
      return command
    }

    // For the lenght of the possibleCategories check what category it fits into and the print that category
    // more elifs  have to be done manually if you add more categories
    for (var i = 0; i < possibleCategories.length; i++) {

      // Print Miscelaneous category
      if (possibleCategories[i] == 'Miscelaneous') {
        helpInfoEmbed.addField("Miscelaneous:",printCommands('System',allCommandsInfo))
        helpInfoEmbed.addField("\u200B","\u200B")
      } else if (possibleCategories[i] == 'System') {
        // Print System category
        helpInfoEmbed.addField("System:",printCommands('Miscelaneous',allCommandsInfo))
      }
    }
    message.channel.send(helpInfoEmbed)

  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
