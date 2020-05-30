exports.run = async (client, message, args, level) => {
  const embed = {
    "url": "https://www.thispersondoesnotexist.com/",
    "title": "This person does not exist.",
    "color": 1984960,
    "footer": {
      "icon_url": "https://feen.us/xvzn8g.png",
      "text": "Imagined by a GAN | Powered by: thispersondoesnotexist.com"
    },
    "image": {
      "url": "https://www.thispersondoesnotexist.com/image.jpg?"+ Math.floor(100000 + Math.random() * 900000)
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
  name: "tpdne",
  category: "Fun",
  description: "This person does not exist",
  usage: "tpdne"
};
