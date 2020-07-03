const config = require("./../config.js");

exports.BotGuildUpdater = class {

  constructor() {
    this.DBL = require("dblapi.js");
    this.dbl = new this.DBL(config.topgg, this.client);
  }

  /**
	 * Updates the numbers on top.gg
	 *
	 * @param {Number} guildSize - Amount of guilds where the server is on.
	 *
	 * */

  updateTopGg(client, guildSize) {
    this.dbl.postStats(guildSize);
    client.logger.debug(`Guld size updated to ${guildSize} on TOP.GG`);
    this.dbl.on("error", e => {
      client.logger.error(`Error occurred while trying to update the server amount on top.gg! ${e}`);
      console.error(e);
    });
  }


};
