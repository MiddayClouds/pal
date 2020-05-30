exports.run = async (client, message, args, level) => {
  const embed = {
    "url": "https://www.thisartworkdoesnotexist.com/",
    "title": "This piece of art does not exist.",
    "color": 1984960,
    "footer": {
      "icon_url": "https://feen.us/xvzn8g.png",
      "text": "Imagined by a GAN | Powered by: thisartworkdoesnotexist.com"
    },
    "image": {
      "url": "https://www.thisartworkdoesnotexist.com/artwork?"+ Math.floor(100000 + Math.random() * 900000)
    }
  }
  message.channel.send({ embed });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User", // Who can use it
  cooldown: 5
};

exports.help = {
  name: "tadne",
  category: "Fun",
  description: "This art does not exist",
  usage: "tadne"
};
