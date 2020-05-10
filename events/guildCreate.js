// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {

  // Log the bot joining the guild
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);

  // Update the server number on top.gg
  const updater = new BotListUpdater()
  updater.updateTopGg(client.guilds.cache.size)
};
