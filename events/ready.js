module.exports = async client => {
  const { version } = require("discord.js");

  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  // NOTE: client.wait and client.log are added by ./util/functions.js !
  await client.wait(1000);

  // This loop ensures that client.application always contains up to date data
  // about the app's status. This includes whether the bot is public or not,
  // its description, owner(s), etc. Used for the dashboard amongs other things.
  client.application = await client.fetchApplication();


  if (client.owners.length < 1) client.application.owner ? client.owners.push(...client.application.owner.members.keys()) : client.owners.push(client.application.owner.id);

  setInterval( async () => {
    client.owners = [];
    client.application = await client.fetchApplication();
    client.application.team ? client.owners.push(...client.application.team.members.keys()) : client.owners.push(client.application.owner.id);
  }, 60000);

  //client.owners.push(client.application.team.members.keys());

  // Check whether the "Default" guild settings are loaded in the enmap.
  // If they're not, write them in. This should only happen on first load.
  if (!client.settings.has("default")) {
    if (!client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
    client.settings.set("default", client.config.defaultSettings);
  }

  // Initializes the dashboard, which must be done on ready otherwise some data
  // may be missing from the dashboard.
  require("../util/dashboard")(client);

  // Set bot status to `booting up`
  client.user.setPresence({ activity: { name: "Booting up..." }, status: "idle" });

  // Pause the client for 5 seconds
  await client.wait(5000);

  // Set bot status to the help prefix
  client.user.setPresence({ activity: { name: `for ${client.settings.get("default").prefix}help on ${client.guilds.cache.size} guilds.`, type: "WATCHING"}, status: "online"});

  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.getMembers(client.guilds)} users in ${client.guilds.cache.size} servers.`, "ready");
  // Debug
  client.logger.debug(`BOT ID: ${client.user.id}`);
  //client.logger.debug(`BOT VERSION: ${package.version}`);
  client.logger.debug(`DISCORD.JS VERSION: v${version}`);
  client.logger.debug(`NODE.JS VERSION: ${process.version}`);
};
