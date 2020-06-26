exports.run = (client, message, args,
               level) => { // eslint-disable-line no-unused-vars
  const Discord = require("discord.js");

  // Check if anyone has been tagged in the command.
  // If noone has been tagged then reply to the user asking for an @
  if (!message.mentions.users.size) {
    return message.reply(
        "You need to tag a user to display information about them.");
  }

  // This nicely styles the nickname label so it does not just vomit 'null' but
  // instead says "None". Might move it to just an if statement but it is nicer
  // like this withouth having 2000000 addField() commands
  function hasNickname(nickname) {
    if (nickname === null) {
      const userGuildNickname = "None";
      return userGuildNickname;
    } else {
      return nickname;
    }
  }

  const taggedUser = message.guild.member(message.mentions.members.first());
  const userCreatedDate =
      client.getDate(new Date(taggedUser.user.createdTimestamp));
  const userGuildJoinDate =
      client.getDate(new Date(taggedUser.joinedTimestamp));
  const userRoles = taggedUser.roles.cache.array().map(r => (" " + r.name));
  userRoles.pop();
  const userInfoEmbed = new Discord.MessageEmbed();
  const emojiYes = client.emojis.cache.get("710291841639252017");

  // userInfoEmbed.setColor("#3498DB");
  userInfoEmbed.setColor(taggedUser.roles.highest.hexColor);
  userInfoEmbed.setTitle(":bust_in_silhouette: " + taggedUser.user.tag + "");
  userInfoEmbed.setDescription("\u200B");
  userInfoEmbed.setThumbnail(taggedUser.user.displayAvatarURL());
  userInfoEmbed.addFields(
      {
        name : ":name_badge: **Nickname:** ",
        value : hasNickname(taggedUser.nickname),
        inline : true
      },
      {name : "\u200B", value : "\u200B", inline : true},
      {
        name : ":id: **Id:** ",
        value : "`" + taggedUser.id + "`",
        inline : true
      },
      //
      {
        name : ":globe_with_meridians: **Account Created:**",
        value : `__${userCreatedDate}__`,
        inline : true
      },
      {name : "\u200B", value : "\u200B", inline : true},
      {
        name : ":inbox_tray: **User Joined Guild:**",
        value : `__${userGuildJoinDate}__`,
        inline : true
      },
  );
  if (taggedUser.user.bot === true) {
    userInfoEmbed.addField(":robot: **Bot:**", emojiYes, true);
    userInfoEmbed.addField("\u200B", "\u200B", true);
  }
  userInfoEmbed.addField(":shield: **Roles:**", "`" + userRoles + "`", true);
  userInfoEmbed.setTimestamp();
  userInfoEmbed.setFooter("Requested by: " + message.author.username,
                          message.author.displayAvatarURL());

  message.channel.send(userInfoEmbed);
};

exports.conf = {
  enabled : true,
  guildOnly : true,
  aliases : [ "user-info", "ui", "whois" ],
  permLevel : "User",
  cooldown : 5
};

exports.help = {
  name : "user",
  category : "Miscelaneous",
  description : "Outputs information about tagged user.",
  usage : "`user @user`"
};
