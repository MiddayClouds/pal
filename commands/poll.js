exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const loadash = require('lodash')
  const chrono = require('chrono-node')
  const Moment = require('moment')
  let idGenerator = () => {
    return Math.floor((1 + Math.random()) * 0x100000)
    .toString(16)
    .substring(1);
  }
  const pollID = idGenerator()
  const pollEmbed = new Discord.MessageEmbed()
  const pollCreator = message.guild.member(message.author)
  const msg = args.join(' ')
  const time = loadash.parseInt(args[0])
  const timeToday = new Date()
  var expiryDate = new Date(timeToday.getTime() + time*60000);
  //const pollTitle = args[2]
  args.shift()
  args.shift()
  //args.shift()
  const pollDescription = args.join(" ");

  pollEmbed.setColor('#00FDFF')
  pollEmbed.setAuthor(`Poll by: ${message.author.username}`, pollCreator.user.displayAvatarURL())
  pollEmbed.setTitle(pollDescription)
  //pollEmbed.setDescription(pollDescription)
  pollEmbed.setTimestamp(expiryDate)
  pollEmbed.setFooter(`Poll ID: ${pollID} | Poll expires `)

  const pollCreateReceipt = {
    "title": "Confirmation for poll ID: `" + pollID +"`",
    "timestamp": expiryDate,
    "color": 16010381,
    "footer": {
      "icon_url": client.user.displayAvatarURL(),
      "text": "Poll expires "
    },
    "author": {
      "name": message.author.username,
      "icon_url": pollCreator.user.displayAvatarURL()
    },
    "fields": [
      {
        "name": "Poll Name:",
        "value": "`" + pollDescription + "`"
      }
      // {
      //   "name": "Poll description",
      //   "value": "`" + pollDescription + "`"
      // }
    ]
  }
  // if (!args[0]) {
  //   message.channel.send('Invalid Format!\nTry using this format: `' + message.settings.prefix +'poll <minutes> minutes <poll title>`\nFor example: `' + message.settings.prefix +'poll 2 minutes Should we host a game night?`')
  // }

  var yesPollReactions = []
  var noPollReactions = []

  async function createPoll(message) {

    // Send the poll to the executed channel.
    const pollMessage = await message.channel.send(pollEmbed)
    pollMessage.react('710291841639252017')
    pollMessage.react('710291890465144872')

    const yesFilter = (yesReaction) => yesReaction.emoji.id === '710291841639252017';
    const yesCollector = pollMessage.createReactionCollector(yesFilter, { time: (time - 1)*60000 });
    // console.log(`Collected ${r.emoji.name})
    yesCollector.on('collect', rYes => yesPollReactions.push(rYes.emoji.name));
    //yesCollector.on('end', yesCollected => yesPollReactions = yesCollected.size);
    // WHY NOT JUST ADD THE COLLECTED.SIZE

    const noFilter = (noReaction) => noReaction.emoji.id === '710291890465144872';
    const noCollector = pollMessage.createReactionCollector(noFilter, { time: (time - 1)*60000 });
    // console.log(`Collected ${r.emoji.name})
    noCollector.on('collect', rNo => noPollReactions.push(rNo.emoji.name));
    //noCollector.on('end', noCollected => noPollReactions = noCollected.size);

    // Send confirmation of poll creation to author of poll.
    message.author.send(':ballot_box: Your poll with the ID `' + pollID + '`, has been created. Your receipt is below:', { embed: pollCreateReceipt });
    return yesPollReactions
    return noPollReactions
  }




  // Create a new promise
  return new Promise((resolve) => {

    // This is triggered if the format is incorrect.
    if (!args || args.length < 1) return message.channel.send('Invalid Format!\nTry using this format: `' + message.settings.prefix +'poll <minutes> minutes <poll title>`\nFor example: `' + message.settings.prefix +'poll 2 minutes Should we host a game night?`')
    if (time == 1) return message.channel.send('The poll must be at least 2 minutes long!')

    const results = chrono.parse(msg)
    //if (results.length === 0) return resolve('Error parsing date. Try using format: +remind <minutes> <message>')

    // Construct the endTime for the poll.
    let endTime = Moment(results[0].start.date())

    // Construct the time right now.
    const currentTime = new Moment()

    // Construct the duration of the poll.
    let duration = Moment.duration(endTime.diff(currentTime))
    // Construct the total lenght of the poll in minutes.
    let minutes = Math.round(duration.asMinutes())

    // This is triggered if minutes is bigger than one.
    if (minutes < 1) {
      if (results[0].end) {
        endTime = results[0].end.date()
        duration = Moment.duration(endTime.diff(currentTime))
        minutes = duration.asMinutes()
      }
      if (minutes < 1) {
        message.channel.send('Time must be at least 1 minute.')
      }
    }
    if (minutes > 10080) return resolve('Maximum time is 7 days (10080 minutes)')



    createPoll(message)

    setTimeout(() => {
      const pollEndReceipt = {
        "title": "The poll: `" + pollID +"` has concluded.",
        "description": "The poll titled `"+ pollDescription + "` has concluded. The results were the following:",
        "timestamp": expiryDate,
        "color": 16010381,
        "footer": {
          "icon_url": client.user.displayAvatarURL(),
          "text": "Poll expired "
        },
        "author": {
          "name": message.author.username,
          "icon_url": pollCreator.user.displayAvatarURL()
        },
        "fields": [
          {
            "name": "Total <:BotListYes:710291841639252017> votes:",
            "value": (yesPollReactions.length - 2),
            "inline": true
          },
          {
            "name": "Total <:BotListNo:710291890465144872> votes:",
            "value": (noPollReactions.length - 2),
            "inline": true
          }
        ]
      }

      // Send warning to author of poll.
      //message.author.send(':loudspeaker: Heads up! Your poll with the ID of `' + pollID + '` has expired. Your receipt is below:')
      message.author.send(':loudspeaker: Heads up! Your poll with the ID `' + pollID + '`, has expired. Your receipt is below:',{ embed: pollEndReceipt})

      // Send end of poll recepit to channel.
      message.channel.send({ embed: pollEndReceipt})

    }, minutes * 60000)

  })
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: "User", // Who can use it
  cooldown: 5
};

exports.help = {
  name: "poll",
  category: "Server",
  description: "Creates a poll for the server.",
  usage: "`poll (time) (title)` | Example: `poll 2 minutes Should we host a game night?`"
};
