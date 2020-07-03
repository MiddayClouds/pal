const Discord = require("discord.js");
const embed = new Discord.MessageEmbed();

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  //const permYes = client.emojis.cache.get("710291841639252017");
  const permNo = client.emojis.cache.get("710291890465144872");
  const requiredPerms = ["MANAGE_ROLES","MANAGE_CHANNELS","MANAGE_WEBHOOKS","VIEW_CHANNEL","SEND_MESSAGES","MANAGE_MESSAGES","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS"];
  const recievedPerms = [];
  let totalRecievedPerms = 0;

  function removeDuplicates(arr1, arr2) {
    return [...new Set(arr1.concat(arr2).filter(e => ! (arr2.includes(e) && arr1.includes(e))))];
  }

  // If no arguments are given simply fix shit
  if (!args[0]) {

    // This checks every permission the bot has
    for (var i = 0; i < requiredPerms.length; i++) {
      // This is triggered IF the bot has said permission
      if (message.channel.permissionsFor(message.guild.me).has(requiredPerms[i])) {
        //console.log("YAY I HAVE " + requiredPerms[i]);
        totalRecievedPerms += 1;
        recievedPerms.push(requiredPerms[i]);
      }
    }
    // This bit down here sends the embed with info
    if (totalRecievedPerms == 11) {
      embed.setColor("#27ae60");
      embed.setTitle("Nothing to fix, I already have all the required permissions!");
      message.channel.send(embed);
    } else if (totalRecievedPerms < 11) {
      const missingPerms = removeDuplicates(requiredPerms, recievedPerms);
      embed.setTitle(`Tested \`${totalRecievedPerms}/11\` required permissions`);
      embed.setDescription("The following permissions are missing or I do not have access to them.\nPlease review them and allow my role (`Pal`) to use them.");
      // for (var i = 0; i < recievedPerms.length; i++) {
      //   embed.addField(permYes,recievedPerms[i], true)
      // }
      for (var i = 0; i < missingPerms.length; i++) { // eslint-disable-line no-redeclare
        embed.setColor("#c0392b");
        embed.addField(`Permission: \`${missingPerms[i]}\``,`Status: ${permNo}`, true);
      }
      message.channel.send(embed);
    }
  }

  if (args[0] === "list") {
    //embed.setTitle(``)
    embed.setColor("#2980b9");
    embed.setDescription("Here is a list of all the required permissions Pal needs to work:");
    for (var i = 0; i < requiredPerms.length; i++) { // eslint-disable-line no-redeclare
      embed.addField(`\`${requiredPerms[i]}\``,"Required: Yes", false);
    }
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["fix"],
  permLevel: "Administrator", // Who can use it
  cooldown: 5
};

exports.help = {
  name: "rebuild",
  category: "System",
  description: "Helps server administrators troubleshoot why some commands might not work.",
  usage: "`rebuild` or `rebuild list`"
};
