// Any module required will be written up here
const Util = require('./../modules/util')
const dateTime = require('date-time')

/**
 * Command: user
 * Description: Outputs an embed containing information about the specified user.
 * */

module.exports = {
	name: 'user',
	description: 'Outputs an embed containing information about the specified user.',
	execute(message, args, config) {
    // Start of command:

    // Made a try-catch because if someone is funny and tries to get data from a user which he cannot mention but still tries lmao.
    try {
      const member = message.guild.member(message.mentions.members.first())
      let userCreatedDate = Util.getDate(new Date(member.user.createdTimestamp))
      let guildJoinDate = Util.getDate(new Date(member.joinedTimestamp))
      //const guildMember = new Discord.GuildMember()
      //let roles = member.roles.highest.map()
      //let roles = member.roles.highest.map()
      //let roles = member.roles.highest.map((a) => {
        //  return a
      //})
      const embed = {
        "title": "User Info:",
        "description": member.user.toString() + " (" + member.user.tag + ")",
          "color": 15448698,
          "timestamp": new Date(),
          "footer": {
            "icon_url": message.client.user.displayAvatarURL(),
            "text": message.client.user.username
          },
          "thumbnail": {
            "url": member.user.displayAvatarURL()
          },
          "author": {
            "name": "Username: " + member.user.username,
            "icon_url": member.user.displayAvatarURL()
          },
          "fields": [
            {
              "name": "Account created at:",
              "value": userCreatedDate
            },
            {
              "name": "Joined this server at:",
              "value": guildJoinDate
            },
            {
              "name": "ID:",
              "value": member.user.id
            }
          ]
        };
        message.channel.send({ embed });
      } catch (e) {
        console.log(e)
        message.channel.send({
          embed: {
            title: 'No user found in this guild with the name ' + args[0]
          }
      })
    }

  },
}
