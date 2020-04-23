/**
 *
 * @fileoverview Here are all functions which make our life much easier.
 * @author Julian Yaman
 *
 */

const colors = require('colors')
const dateTime = require('date-time')

colors.setTheme({
	info: 'green',
	data: 'gray',
	warn: 'yellow',
	error: 'red',
	debug: 'cyan',
})

exports.getDate = function (/** Object */date) {
  /* We can use this later
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  */
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}


/**
 * Returns a rounded number.
 *
 * @param {Number} value - The number you want to round.
 * @param {Number} precision - Precision of the decimal number.
 *
 * @private
 */
// Thanks Billy Moon for giving the answer how to make a more precise round function: https://stackoverflow.com/a/7343013
exports.roundNumber = (value, precision) => {
	const multiplier = Math.pow(10, precision || 0)
	return Math.round(value * multiplier) / multiplier
}

exports.Logger = class {

	debug(text) {
		console.log(`[DEBUG] [${dateTime({ local: true, showTimeZone: true })}] ${text}`.debug)
	}

	error(text) {
		console.log(`[ERR] [${dateTime({ local: true, showTimeZone: true })}] ${text}`.error)
	}

	errorChat(msg, text) {
		if(msg.channel.type === 'dm' || msg.channel.type === 'group') {
			console.log(`[ERR] [${dateTime({ local: true, showTimeZone: true })}] DM Chat: ${text}`.error)
		}
		else{
			console.log(`[ERR] [${dateTime({ local: true, showTimeZone: true })}] (${msg.guild.name} | ${msg.guild.id}): ${text}`.error)
		}
	}

	info(text) {
		console.log(`[INFO] [${dateTime({ local: true, showTimeZone: true })}] ${text}`.info)
	}

	warn(text) {
		console.log(`[WARN] [${dateTime({ local: true, showTimeZone: true })}] ${text}`.warn)
	}

}
