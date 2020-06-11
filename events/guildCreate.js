// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {

  // Log the bot joining the guild
  client.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) with ${guild.memberCount} members added the bot.`);

  // Update the server number on top.gg
  const BotListUpdater = require('./../modules/listUpdaters').BotGuildUpdater
  const updater = new BotListUpdater()
  updater.updateTopGg(client, client.guilds.cache.size)
};
