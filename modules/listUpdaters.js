const config = require("./../config.js");

exports.BotGuildUpdater = class {

	constructor() {
		this.DBL = require('dblapi.js')
		this.dbl = new this.DBL(config.topgg, client)
	}

	/**
	 * Updates the numbers on top.gg
	 *
	 * @param {Number} guildSize - Amount of guilds where the server is on.
	 *
	 * */
	updateTopGg(guildSize) {
		this.dbl.postStats(guildSize)
		this.dbl.on('error', e => {
			if (config.DEVELOPMENT !== true) {
				Logger.error('Error occurred while trying to update the server amount on top.gg!')
				console.error(e)
			}
		})
	}


}
