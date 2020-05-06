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
    `Pineapple should not go on pizza.`,
    `VVVVVV`,
    `${client.settings.get("default").prefix}help me.`,
    `Robots are forever on life support.`,
    `I no longer find Cards Against Humanity funny.`,
    `Tell your friends about it!`,
    `Yoshi committed tax fraud!`,
    `Waluigi is the best.`,
    `Now using the backpack.tf API`,
    `Find me on github!`,
    `Be safe, stay home!`,
    `Shop for those in need!`,
    `Go on try me!`,
    `Just use ${client.settings.get("default").prefix}`,
    `Json! Json! Json!`,
    `Soon anime will be taxed!`,
    `Now with Steam functionality!`,
    `On version ${package.version}!`,
    `Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch is a real place!`,
    `A Man Has Fallen Into The River In Lego City!`
  ]


  // Change the bots status to something random every 10 minutes.
  setInterval(() => {
    client.user.setActivity(randomActivities.random(), {type: "PLAYING"});
  }, 600000);

  // Creating a new updater
		const updater = new BotListUpdater()

		// Interval for updating the amount of servers on top.gg every 60 minutes
		setInterval(() => {
			updater.updateTopGg(client.guilds.cache.size)
		}, 3600000);

};
