/**
 *
 * @fileoverview Had no name for this file, so it´s now no-name.js. Here are all functions needed for some commands
 * @author Julian Yaman
 *
 */

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
