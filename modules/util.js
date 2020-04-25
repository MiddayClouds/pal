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

/**
 * A function which is looping a timeout which return the emoji reactions when a user want to count the discord members of a server.
 *
 * @param statement - Should be 0. 0 is the first part of a string.
 * @param lengthNumber - Length of the count-discord-member string.
 * @param memberAmountString - Discord member count number as a string.
 * @param channel - Message parameter of a function when asking the bot client if the message event happened.
 * @since 1.0.1
 *
 * @public
 */
 
exports.loop = (/** Number */statement, /** Number */lengthNumber, /** String */memberAmountString, /** Message */msg) => {
  let newStatement = statement + 1
  setTimeout(function () {
    if (statement < lengthNumber) {
      exports.loop(newStatement, lengthNumber, memberAmountString, msg)
    } else {
      return null
    }
    let numberPart = memberAmountString[statement]
    console.log(numberPart + ' -> ' + statement)
    switch (numberPart) {
      case '0':
        msg.react('0⃣')
        break
      case '1':
        msg.react('1⃣')
        break
      case '2':
        msg.react('2⃣')
        break
      case '3':
        msg.react('3⃣')
        break
      case '4':
        msg.react('4⃣')
        break
      case '5':
        msg.react('5⃣')
        break
      case '6':
        msg.react('6⃣')
        break
      case '7':
        msg.react('7⃣')
        break
      case '8':
        msg.react('8⃣')
        break
      case '9':
        msg.react('9⃣')
        break
      default:
        msg.react('⛔')
      // default cant happen but maybe it will anyway ok
    }
  }, 500)
}
