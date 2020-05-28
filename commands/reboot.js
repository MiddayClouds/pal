exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  await message.reply("Bot is shutting down.");
  await client.user.setPresence({ activity: { name: 'Bot shutting down...' }, status: 'dnd' })
  await Promise.all(client.commands.map(cmd =>
    client.unloadCommand(cmd)
  ));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin",
  cooldown: 20
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot"
};
