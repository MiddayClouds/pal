// This event executes when a new guild (server) is left.

module.exports = (client, guild) => {
  if (!guild.available) return; // If there is an outage, return.

  // Log the bot leaving the guild
  client.logger.log(`[GUILD LEAVE] ${guild.name} (${guild.id}) with ${guild.memberCount} members removed the bot.`);

  // Set bot status to the help prefix
  client.user.setPresence({ activity: { name: `for ${client.settings.get("default").prefix}help on ${client.guilds.cache.size} guilds.`, type: "WATCHING"}, status: 'online'})


  // Update the bot guild count on topgg
  const BotListUpdater = require('./../modules/listUpdaters').BotGuildUpdater
  const updater = new BotListUpdater()
  updater.updateTopGg(client, client.guilds.cache.size)

  // If the settings Enmap contains any guild overrides, remove them.
  // No use keeping stale data!
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }

};
