module.exports = async client => {
  const package = require("./../package.json");
  const BotListUpdater = require('./../modules/listUpdaters').BotGuildUpdater

  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.getMembers(client.guilds)} users in ${client.guilds.cache.size} servers.`, "ready");

  // Set bot status to `booting up`
  client.user.setActivity(`Booting up...`, {type: "PLAYING"});

  // Pause the client for 5 seconds
  await client.wait(5000);

  // Set bot status to the help prefix
  client.user.setActivity(`${client.settings.get("default").prefix}help on ${client.guilds.cache.size} guilds.`, {type: "PLAYING"});

  const randomActivities = [
    `pineapple should not go on pizza.`,
    `VVVVVV`,
    `${client.settings.get("default").prefix}help me.`,
    `robots are forever on life support.`,
    `i no longer find Cards Against Humanity funny.`,
    `tell your friends about it!`,
    `Yoshi committed tax fraud!`,
    `Waluigi is the best.`,
    `now using the backpack.tf API`,
    `find me on github!`,
    `be safe, stay home!`,
    `shop for those in need!`,
    `go on try me!`,
    `just use ${client.settings.get("default").prefix}`,
    `Json! Json! Json!`,
    `soon anime will be taxed!`,
    `now with Steam functionality!`,
    `on version ${package.version}!`,
    `llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch is a real place!`,
    `a Man Has Fallen Into The River In Lego City!`
  ]


  // Change the bots status to something random every 10 minutes.
  setInterval(() => {
    client.user.setActivity(randomActivities.random(), {type: "PLAYING"});
  }, 600000);

  // Creating a new updater
		//const updater = new BotListUpdater()

		// Interval for updating the amount of servers on top.gg every 60 minutes
		// setInterval(() => {
		// 	updater.updateTopGg(client.guilds.cache.size)
		// }, 3600000);

};
