// Any module required will be written up here
const Util = require('./../modules/util')
const Logger = new Util.Logger();

/**
 * Command: HTTP
 * Description: Gives a cute cat
 * */

module.exports = {
	name: 'http',
	description: 'Gives a cute cat',
	execute(message, args, config) {
    // Check in what type of channel the command was executed
		if(message.channel.type === 'dm' || message.channel.type === 'group') {
			Logger.info(`${config.PREFIX + this.name} used in a private ${message.channel.type}.`)
		}
		else{
			Logger.info(`${config.PREFIX + this.name} used on ${message.guild.name} (${message.guild.id}; ${message.guild.memberCount} users)`)
		}

    try {
      const errors = ["100", "101", "200", "201","202","204","206","207","300","301","302","303","304","305","307","400","401","402","403","404","405","406","408","409","410","411","412","413","414","415","416","417","418","420","421","421","422","423","424","425","426","429","431","444","450","451","499","500","501","502","503","504","506","507","508","509","510","511","599"]
      const ranErrors = errors[Math.floor(Math.random() * errors.length)]
      const embed = {
        "url": "https://http.cat",
        "color": 1984960,
        "footer": {
          "icon_url": "https://http.cat/mask-icon.svg",
          "text": "Powered by: http.cat"
        },
        "image": {
          "url": "https://http.cat/" + ranErrors + ".jpg"
        }
      };
      message.channel.send({ embed });
    } catch (e) {
      console.log(e)
      message.channel.send({
        embed: {
          title: 'Error ' + args[0]
        }
      })
    }

	},
}
