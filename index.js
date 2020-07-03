// This is just a failsafe that checks that the node version isnt the problem
if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");

// Load up the API permissions the bot needs
const { Client, Intents } = require("discord.js");

// Save the API permissions the bot needs
const botIntents = new Intents(Intents.NON_PRIVILEGED);
botIntents.remove(["GUILD_PRESENCES"]);

// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
// Defining the client.
const client = new Client({ ws: { intents: botIntents }, disableMentions:"everyone"});

// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

client.bans = require("./bans.js");

// Require the logger module, this sends webhooks with logs
client.logger = require("./util/logger.js");

// Require some useful functions
require("./util/functions.js")(client);

// Create Cooldowns
client.cooldowns = new Discord.Collection();

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Discord "recently" introduced Teams, where you can share bot applications between
// a team of developers, so let's create a new array to push owner ids to.
client.owners = new Array();

//client.owners.push("134919543691804672");

// Now we integrate the use of Evie's awesome EnMap module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({ name: "settings", cloneLevel: "deep", fetchAll: false, autoFetch: true });

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");

  const loadedCommands = [];

  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f,loadedCommands);
    if (response) console.log(response);
  });

  client.logger.log(`Commands Loaded: ${loadedCommands}`);

  const loadedEvents = [];

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    loadedEvents.push(` ${eventName}`);
    //client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event.
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Log the event
  client.logger.log(`Events Loaded: ${loadedEvents}`);

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

// End top-level async/await function.
};

init();
