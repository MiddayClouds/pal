const Discord = require("discord.js");

// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = async (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = message.settings = client.getSettings(message.guild);

  // Checks if the bot was mentioned, with no message after it, returns the prefix.
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\`. To set a new one use ${settings.prefix}set. If you need help use ${settings.prefix}help`);
  }

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send(":exclamation: Error id: 405 | This command is unavailable via private message. Please run this command in a guild.");

  // If user should not run the command let them know
  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`:no_entry: Error id: 403 | You do not have permission to use this command. `);
                                  // Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
                                  // This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  if (cmd.conf.enabled == false) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`:interrobang: Error id: 423 | This command has been disabled.`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  // Check if the command is currently on cooldown
  if (!client.cooldowns.has(cmd.help.name)) {
    // If it's not add it to the commands that will be on cooldown
    client.cooldowns.set(cmd.help.name, new Discord.Collection());
  }

  // Set now as the current time
  const now = Date.now();

  // Set the timestamp
  const timestamps = client.cooldowns.get(cmd.help.name);

  // Set the cooldown amount
  const cooldownAmount = (cmd.conf.cooldown || 3) * 1000;

  // Check if the timestamp has the author of the message
  if (timestamps.has(message.author.id)) {
    // Create an expiration time for the command.
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    // If the expirationTime is bigger than the time now warn that the user has to wait
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.help.name}\` command.`);
    }
  }

  // Set the timestamp as the author id and the time now
  timestamps.set(message.author.id, now);

  // Delete the author from the timestamps.
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // If the command exists, **AND** the user has permission, run it
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);

  // Only triggers if not in a DM otherwise it throws error as it cant manage perms
  if(message.channel.type === 'text') {
    // React to the message to show the bot is processing
    message.react('704834924158386196').then(() => message.reactions.cache.get('704834924158386196').remove().catch(error => console.error('Failed to remove reactions: ', error)))
  }

  //message.channel.startTyping()

  // Run the command
  cmd.run(client, message, args, level)

  //message.channel.stopTyping()
};
