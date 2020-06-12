// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {

  // Log the bot joining the guild
  client.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) with ${guild.memberCount} members added the bot.`);

  // Set bot status to the help prefix
  client.user.setPresence({ activity: { name: `for ${client.settings.get("default").prefix}help on ${client.guilds.cache.size} guilds.`, type: "WATCHING"}, status: 'online'})


  // Update the server number on top.gg
  const BotListUpdater = require('./../modules/listUpdaters').BotGuildUpdater
  const updater = new BotListUpdater()
  updater.updateTopGg(client, client.guilds.cache.size)
};
