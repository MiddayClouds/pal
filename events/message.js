const Discord = require("discord.js");

// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {

  // Ignore other bots.
  if (message.author.bot) return;

  // Grab the settings for this server from the PersistentCollection
  // If there is no guild, get default conf (DMs)
  // For ease of use in commands and functions, we'll attach the settings
  // to the message object, so `message.settings` is accessible.
  const settings = message.settings = client.getSettings(message.guild);

  // Just in case we don't know what the current prefix is, mention the bot
  // and the following regex will detect it and fire off letting you know
  // what the current prefix is.
  const mentionMatch = new RegExp(`^<@!?${client.user.id}> ?$`);
  if (message.content.match(mentionMatch)) {
    return message.reply(`my prefix on this guild is \`${settings.prefix}\`\nIf you are a guild admin and want to configure the bot use \`${settings.prefix}set\`\nOtherwise, if you need help use \`${settings.prefix}help\``);
  }

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file, but as a fall back we'll also use
  // a mention as a prefix.
  // So the prefixes array lists 2 items, the prefix from the settings and
  // the bots user id (a mention).
  const prefixes = [settings.prefix.toLowerCase(), `<@!${client.user.id}>`];

  const content = message.content.toLowerCase();
  const prefix = prefixes.find(p => content.startsWith(p));
  if (!prefix) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthing; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send(":exclamation: Error id: 405 | This command is unavailable via private messages. Please run this command in a guild.");
  }
  // Output an error if bot is configured to when a user attempts to use a command they should not use.
  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(":no_entry: Error id: 403 | You do not have enough permissions to use this command.");
      // Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
      // This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }
  // Check if the command has been manually disabled.
  if (cmd.conf.enabled == false) {
    if (settings.systemNotice === "true") {
      return message.channel.send(":interrobang: Error id: 423 | This command has been disabled.");
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



  if (client.bans.users.includes(message.author.id)) {
    if (settings.systemNotice === "true") {
      return message.channel.send(":interrobang: Error id: 401 | You have been barred from all aspects of the bot.");
    } else {
      return;
    }
  }

  // Set the timestamp as the author id and the time now
  timestamps.set(message.author.id, now);

  // Delete the author from the timestamps.
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // Only triggers if in a DM in order to not recieve errors when getting guild IDs.

  if (message.channel.type === "dm") {
    // Log the used command and helpful info.
    client.logger.cmd(`${cmd.help.name}\nINTERNAL RANK & GUILD:: ${client.config.permLevels.find(l => l.level === level).name} || Direct Message\nUSERNAME:: ${message.author.tag} ()${message.author.id})`);
  }

  //Only triggers if command is used in a guild in order to not recieve errors when getting guild IDs.
  if (message.channel.type === "text") {
    // Log the used command and helpful info.
    client.logger.cmd(`${cmd.help.name}\nINTERNAL RANK & GUILD:: ${client.config.permLevels.find(l => l.level === level).name} || ${message.guild.name} (${message.guild.id})\nUSERNAME:: ${message.author.tag} (${message.author.id})`);
    // React to the message to show the bot is processing
    //message.react('717875601964269658').then(() => message.reactions.cache.get('717875601964269658').remove().catch(error => console.error('Failed to remove reactions: ', error)))
  }

  // If the command exists, **AND** the user has permission, run it.
  cmd.run(client, message, args, level);
};
