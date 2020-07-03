// This event executes when the bot joins a new guild (server).

module.exports = (client, guild) => {
  // Update the activity to show the updated number of guilds.
  client.user.setPresence({ activity: { name: `for ${client.settings.get("default").prefix}help on ${client.guilds.cache.size} guilds.`, type: "WATCHING"}, status: "online"});

  // Log the bot joining the guild
  client.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) with ${guild.memberCount} members added the bot.`);

  // Update the server number on top.gg
  client.pushTotalGuilds(client, client.guilds.cache.size);
};
