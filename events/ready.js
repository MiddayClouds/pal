module.exports = async client => {
  const BotListUpdater = require('./../modules/listUpdaters').BotGuildUpdater

  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.getMembers(client.guilds)} users in ${client.guilds.cache.size} servers.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});

  // Creating a new updater
		const updater = new BotListUpdater()

		// Interval for updating the amount of servers on top.gg every 30 minutes
		setInterval(() => {
			updater.updateTopGg(client.guilds.cache.size)
		}, 1800000);

};
