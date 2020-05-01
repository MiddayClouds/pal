exports.run = async (client, message, args, level) => {
  //message.reactions.cache.get('703635736603262997').remove().catch(error => console.error('Failed to remove reactions: ', error));
  //console.log(message.reactions.cache.map());
  // Start of command:
  const got = require('got');
  got('http://inspirobot.me/api?generate=true').then((res) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    message.channel.send(
      {
        files:
        [
          res.body
        ]
      }
    )

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
  category: "Miscelaneous",
  description: "Outputs a random embed image from inspirobot.",
  usage: "inspire"
};
