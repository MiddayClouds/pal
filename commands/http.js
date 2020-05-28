exports.run = async (client, message, args, level) => {
  try {
    const errors = ["100", "101", "200", "201","202","204","206","207","300","301","302","303","304","305","307","400","401","402","403","404","405","406","408","409","410","411","412","413","414","415","416","417","418","420","421","421","422","423","424","425","426","429","431","444","450","451","499","500","501","502","503","504","506","507","508","509","510","511","599"]
    const ranErrors = errors.random()
    const embed = {
      "url": "https://http.cat",
      "title": "Error " + ranErrors,
      "color": 1984960,
      "footer": {
        "icon_url": "https://http.cat/favicon.png",
        "text": "Powered by: http.cat"
      },
      "image": {
        "url": "https://http.cat/" + ranErrors + ".jpg"
      }
    }
    message.channel.send({ embed });
  } catch (e) {
    console.log(e)
    message.channel.send({
      embed: {
        title: 'Error ' + args[0]
      }
    })
  }
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
