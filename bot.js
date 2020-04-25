// Load up the discord.js library. Else throw an error.
try {
	// eslint-disable-next-line no-var
	var Discord = require('discord.js')
	if (process.version.slice(1).split('.')[0] < 12) {
		throw new Error('Node 10.0.0 or higher is required. Please upgrade Node.js on your computer / server.')
	}
}
catch (e) {
	console.error(e.stack)
	console.error('Current Node.js version: ' + process.version)
	console.error('In case you´ve not installed any required module: \nPlease run \'npm install\' and ensure it passes with no errors!')
	process.exit()
}

const client = new Discord.Client({ disableMentions: 'everyone' });
const { PREFIX, VERSION, DEVELOPMENT, TOKEN } = require('./config')
const config = require('./config.json')
const bans = require('./bans.json')
//const BotListUpdater = require('./modules/bot-list-updater').BotListUpdater
const runSample = require('./modules/dialog.js').runSample
const talkedRecently = new Set();
const games = [
	'Pineapple should not go on pizza.',
	'Use +help to get help.',
	'+help me.',
	'Robots are forever on life support.',
	'I no longer find Cards Against Humanity funny.',
	'Vine was never funny.',
	'I committed tax fraud for respect to yoshi.',
	'Waluigi is the best.',
	'biagios.github.io/porn',
	'gradientforest.com',
	'iconic.',
	'${PREFIX}help | ${client.guilds.cache.size} servers'
]

// Modules
const Util = require('./modules/util')
const Logger = new Util.Logger();
const fs = require('fs');


// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage();



// Creating a collection for the commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
	// Check if any alias does exist and add if they do
	if(command.alias) {
		for(const alias of command.alias) {
			client.commands.set(alias, command)
		}
	}
}


// Handling client events
client.on('warn', console.warn)

client.on('error', console.error)

client.on('ready', async () => {

	Logger.info('\nStarting Pal...\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version + '\n')
	Logger.info('\nPal is online! Running on version: ' + VERSION + '\n')

	// Different user presences for different development stages
	// TRUE -> debugging
	// FALSE -> Production usage

	if (DEVELOPMENT === true) {
		client.user.setPresence({
			status: 'idle',
			activity: {
				name: `${PREFIX}help | ${client.guilds.cache.size} servers`,
			},
		}).catch(e => {
			console.error(e)
		})
		Logger.warn('Bot is currently set on DEVELOPMENT = true')

	}
	else {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: `${PREFIX}help | ${client.guilds.cache.size} servers`,
			},
		}).catch(e => {
			//console.error(e)
		})
		setInterval(function () {
				const rangame = games[Math.floor(Math.random() * games.length)]
				client.user.setPresence({
					status: 'online',
					activity: {
						name: rangame,
					},
				}).catch(e => {
					//console.error(e)
				})
		}, 60000 * 5)


		// Creating a new updater
		const updater = new BotListUpdater()

		// Interval for updating the amount of servers the bot is used on on top.gg every 30 minutes
		setInterval(() => {
			//updater.updateTopGg(client.guilds.cache.size)
		}, 1800000);

		// Interval for updating the amount of servers the bot is used on on bots.ondiscord.xyz every 10 minutes
		setInterval(() => {
		//	updater.updateBotsXyz(client.guilds.cache.size)
		}, 600000);

		// Interval for updating the amount of servers the bot is used on on discordbotlist.com every 5 minutes
		setInterval(() => {
			//updater.updateDiscordBotList(client.guilds.cache.size, this.totalMembers(), client.voice.connections.size)
		}, 300000);

	}

	Logger.info(`Ready to serve on ${client.guilds.cache.size} servers for a total of ${this.totalMembers()} users.`)
})


// Continuing with Discord client events
client.on('disconnect', () => Logger.info('Disconnected!'))

client.on('reconnecting', () => Logger.info('Reconnecting...'))

// This event will be triggered when the bot joins a guild.
client.on('guildCreate', guild => {

	// Logging the event
	Logger.info(`Joined server ${guild.name} with ${guild.memberCount} users. Total servers: ${client.guilds.cache.size}`)
	// Updating the presence of the bot with the new server amount
	client.user.setPresence({
		activity: {
			name: `${PREFIX}help | ${client.guilds.cache.size} servers`,
		},
	}).catch(e => {
		console.error(e)
	})
	// Sending a "Thank you" message to the owner of the guild
	//guild.owner.send('Thank you for using Pal. :) Please help promoting the bot with voting. Write **' + PREFIX + 'vote** in this channel.')


})

// This event will be triggered when the bot is removed from a guild.
// eslint-disable-next-line no-unused-vars
client.on('guildDelete', guild => {

	// Logging the event
	Logger.info(`Left a server. Total servers: ${client.guilds.cache.size}`)
	// Updating the presence of the bot with the new server amount
	client.user.setPresence({
		activity: {
			name: `${PREFIX}help | ${client.guilds.cache.size} servers`,
		},
	}).catch(e => {
		console.error(e)
	})
})

/**
 * Returns the total amount of users (including bots (sadly...)) who use the bot.
 * */
// TODO: How to just return the "normal" users amount without the bots??
exports.totalMembers = () => {
	const totalMembersArray = client.guilds.cache.map(guild => {
		return guild.memberCount
	})
	let total = 0;
	for(let i = 0; i < totalMembersArray.length; i++) {
		total = total + totalMembersArray[i]
	}
	return total
}

// The data will only be used for analysis.

/* COMMANDS */

client.on('message', async message => {
	if (message.mentions.everyone === false && message.mentions.has(client.user)) {
		// Send the message of the help command as a response to the user
		//client.commands.get('help').execute(message, null, { PREFIX, VERSION })
		//message.reply('message here');
		//console.log(client.user)
		let askedValue = message.content
		//console.log(message.content)
		askedValue = askedValue.replace("<@!300955174225051650>","")
		console.log("Dialogflow Query")
		runSample(message,"pal-bot",askedValue)
	}

	if (message.author.bot) return
	if (!message.content.startsWith(PREFIX)) return undefined

	const args = message.content.split(' ')

	let command = message.content.toLowerCase().split(' ')[0]
	command = command.slice(PREFIX.length)

	// What should the bot do with an unknown command?
	if (!client.commands.has(command)) return;

	/// Spam Protection
	if (talkedRecently.has(message.author.id)) { return }
	talkedRecently.add(message.author.id)
	setTimeout(() => { talkedRecently.delete(message.author.id) }, 2500);


	try {
		client.commands.get(command).execute(message, args, { PREFIX, VERSION });
	}
	catch (error) {
		console.error(error);
		await message.reply('There was an error trying to execute that command!');
	}

})

client.login(TOKEN);

process.on('unhandledRejection', (PromiseRejection) => console.error(`Promise Error -> ${PromiseRejection}`))
