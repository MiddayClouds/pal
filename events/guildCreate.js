// This event executes when the bot joins a new guild.

module.exports = (client, guild) => {
  // Set bot status (updates counter)
  client.user.setPresence({ activity: { name: `for ${client.settings.get("default").prefix}help on ${client.guilds.cache.size} guilds.`, type: "WATCHING"}, status: "online"});

  // Log the event
  client.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) with ${guild.memberCount} members added the bot.`);

  // Update the server number on top.gg
  // const BotListUpdater = require("./../modules/listUpdaters").BotGuildUpdater;
  // const updater = new BotListUpdater();
  // updater.updateTopGg(client, client.guilds.cache.size);

  client.pushTotalGuilds(client, client.guilds.cache.size);
};
