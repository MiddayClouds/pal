exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const Discord = require("discord.js");
  if (!message.mentions.users.size) {
    return message.reply("You need to tag a user to display information about them.");
  }

  const taggedUser = message.guild.member(message.mentions.members.first());
  //const friendly = client.config.permLevels.find(l => l.level === level).name;
  const userCreatedDate = client.getDate(new Date(taggedUser.user.createdTimestamp));
  const userGuildJoinDate = client.getDate(new Date(taggedUser.joinedTimestamp));
  const userRoles = [];
  userRoles.push(taggedUser.roles.cache.map(r => r.name).join(", "));
  function hasNickname(nickname) {
    if (nickname === null) {
      const userGuildNickname = "None";
      return userGuildNickname;
    } else {
      return nickname;
    }
  }
  const userInfoEmbed = new Discord.MessageEmbed()
    .setColor("#3498DB")
    .setAuthor(taggedUser.user.tag, taggedUser.user.displayAvatarURL())
    .setThumbnail(taggedUser.user.displayAvatarURL())
    .addFields(
      { name: "Id: ", value: taggedUser.id,  inline: true },
      { name: "\u200B", value: "\u200B", inline: true },
      { name: "Nickname: ", value: hasNickname(taggedUser.nickname), inline: true },
      //{ name: '\u200B', value: '\u200B' },
      { name: "Account Created:", value: userCreatedDate},
      { name: "User Joined Guild:", value: userGuildJoinDate},
      { name: "Roles:", value: "`" + userRoles + "`" },
    // { name: 'Bot Command Level:', value: '`' + client.permlevel(message.guild.member(message.mentions.members.id.first())) + ' - ' + friendly +'`',inline: true },
    )
    .setTimestamp()
    .setFooter(client.user.username, message.client.user.displayAvatarURL());
  //console.log(taggedUser.roles.cache.map(r => r.name))

  message.channel.send(userInfoEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["user-info","ui","whois"],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "user",
  category: "Miscelaneous",
  description: "Outputs information about tagged user.",
  usage: "`user @user`"
};
