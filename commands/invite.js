exports.run = (client, message, args,
               level) => { // eslint-disable-line no-unused-vars
  message.channel.send({
    embed : {
      color : 3447003,
      fields : [
        {
          name : "Bot Invite: ",
          value :
              "[Clock here](https://discord.com/oauth2/authorize?client_id=" +
                  client.user.id +
                  "&scope=bot%20applications.commands&permissions=805694544) to add the bot to your server.",
        },
      ],
    },
  });
};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : [ "add" ],
  permLevel : "User",
  cooldown : 5
};

exports.help = {
  name : "invite",
  category : "Miscelaneous",
  description : "Outputs a bot invite link",
  usage : "`invite`"
};
