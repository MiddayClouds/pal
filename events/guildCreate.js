// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {

  // Log the bot joining the guild
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) with ${guild.memberCount} members added the bot.`);

  // Update the server number on top.gg
  const updater = new BotListUpdater()
  updater.updateTopGg(client.guilds.cache.size)
};
