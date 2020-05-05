exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "Everyone knows how this command works, outputs the Bot's own and the Discord API latency in ms.",
  usage: "ping"
};
