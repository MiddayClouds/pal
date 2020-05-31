exports.run = async (client, message, args, level) => {
  message.reply("This command has been moved, please use the `generate` command instead.")
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "inspire",
  category: "Fun",
  description: "Outputs a random image from InspiroBot",
  usage: "inspire"
};
