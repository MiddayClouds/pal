const SteamAPI = require("steamapi");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // Creating steam connection
  const steam = new SteamAPI(client.config.steamtoken);
  const steamHandler = require("./../modules/steamAPIfuncs").steamHandler;
  const steamer = new steamHandler();

  // Remove the command from the argument.
  const argument = args[0];


  try {
    if (argument.includes("https://steamcommunity.com/id/")) {
      // THIS IS IF THE ID IS PRETTY AKA NOT A NUMBER
      //console.log('Argument is a pretty id')
      steam.resolve(argument).then(id => {
        //console.log(id)
        //const argument = id
        steamer.getSteamProfileData(message, id);
        return;
      }); //.catch(message.channel.send({embed: {title: ":no_entry: | Please check your input. Enter aither a url or an id."}}));
    } else if (argument.includes("https://steamcommunity.com/profiles/")) {
      // THIS IS IF THE ID IS NOT PRETTY AKA A NUMBER
      //console.log('Argument is a steam 64 id in link')
      //console.log(argument)
      const newArgument = argument.replace("https://steamcommunity.com/profiles/","");
      //console.log(newArgument)

      steamer.getSteamProfileData(message, newArgument);

      return;
    } else if (isNaN(argument) == false) {
      // THIS IS IF SOMEONE ONLY SENDS THE 64 ID
      steamer.getSteamProfileData(message, argument);
      return;
    } else if (isNaN(argument) == true) {

      // THIS IS IF SOMEONE SENDS THE PRETTY ID
      const argumentPretty = "https://steamcommunity.com/id/" + argument;
      steam.resolve(argumentPretty).then(id => {
        //console.log(id)
        const argumentPretty = id;
        // steam.getUserBans(argumentPretty).then(user =>{
        //   console.log(user);
        // })

        steamer.getSteamProfileData(message, argumentPretty);
      });//.catch(message.channel.send({embed: {title: ":no_entry: | Please check your input. Enter aither a url or an id."}}));
      //console.log(argumentPretty)
      return;
    } else {
      message.channel.send({embed: {title: ":no_entry: | Please check your input. Enter aither a url or an id."}});
    }
  } catch (e) {
    //console.log(e)
    message.channel.send({embed: {title: ":no_entry: | Please check your input. Enter aither a url or an id."}});
  }


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["steam-info"],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "steam",
  category: "Miscelaneous",
  description: "Outputs information about given steam account, including SteamRep data.",
  usage: "`steam <steamID64>` OR `steam <customURL>` OR `steam <profile https:// link>`"
};
