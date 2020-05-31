exports.run = async (client, message, args, level) => {
  message.reply("This command has been moved, please use the `generate` command instead.")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User", // Who can use it
  cooldown: 5
};

exports.help = {
  name: "tpdne",
  category: "Fun",
  description: "This person does not exist",
  usage: "tpdne"
};
