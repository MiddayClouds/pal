exports.run = async (client, message, args, level) => {
  //message.reactions.cache.get('703635736603262997').remove().catch(error => console.error('Failed to remove reactions: ', error));
  //console.log(message.reactions.cache.map());
  // Start of command:
  const got = require('got');
  got('http://inspirobot.me/api?generate=true').then((res) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    const embed = {
      "url": "https://inspirobot.me/",
      "title": "Inspiring Quote",
      "color": 1984960,
      "footer": {
        "icon_url": "https://inspirobot.me/website/images/favicon.png",
        "text": "Powered by: inspirobot.me"
      },
      "image": {
        "url": res.body
      }
    }

    message.channel.send({ embed });

  })
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
