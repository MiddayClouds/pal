exports.run = async (client, message, args, level) => {
  message.reply("This command has been moved, please use the `generate` command instead.")
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cat"],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "http",
  category: "Fun",
  description: "Outputs a random embed image from http.cat",
  usage: "http"
};
