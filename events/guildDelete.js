// This event executes when the bot leaves a guild (server).

module.exports = (client, guild) => {
  // Update the activity to show the updated number of guilds.
  client.user.setPresence({ activity: { name: `for ${client.settings.get("default").prefix}help on ${client.guilds.cache.size} guilds.`, type: "WATCHING"}, status: "online"});

  // No use keeping stale data, remove them from the settings and log it!
  client.settings.delete(guild.id);
  // Log to the console that a guild was left.
  client.logger.log(`[GUILD LEAVE] ${guild.name} (${guild.id}) with ${guild.memberCount} members removed the bot.`);

  // Update the bot guild count on topgg
  client.pushTotalGuilds(client, client.guilds.cache.size);

};
