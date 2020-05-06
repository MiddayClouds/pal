const Discord = require("discord.js");
const SteamAPI = require('steamapi');
const config = require("./../config.js");
const got = require('got');
const moment = require('moment');
const steam = new SteamAPI(config.steamtoken);
moment().format();

exports.steamHandler = class {
  getSteamProfileData(msg, id) {
    const steamUserInfo = new Discord.MessageEmbed()
    steam.getUserSummary(id).then(information =>{
      steam.getUserLevel(id).then(level => {
        steam.getUserBans(id).then(bans => {
          got('https://backpack.tf/api/IGetUsers/v3?steamid='+id+'&key='+config.backpackTFkey).then((res) => {
          //console.log(information)
          //console.log(level)
          //console.log(bans)
          steamUserInfo.setTitle(`__**${information.nickname}**__`)
          steamUserInfo.setURL(information.url)
          //steamUserInfo.setDescription(`[Add Friend](steam://friends/add/${information.id}) [Message](steam://friends/message/${information.id}) `)
          steamUserInfo.setColor('#000000')
          steamUserInfo.setThumbnail(information.avatar.large)

          if (information.realName === undefined) {
            steamUserInfo.addField('Real Name:', 'None', true)
          } else if (information.realName !== undefined) {
            steamUserInfo.addField('Real Name:', information.realName, true)
          }

          if (information.countryCode === undefined) {
            steamUserInfo.addField('Country:', ':flag_white: - (None)', true)
          } else if (information.countryCode !== undefined) {
            steamUserInfo.addField('Country:', `:flag_${information.countryCode.toLowerCase()}:`, true)
          }

          if (level <= 9) {
            steamUserInfo.addField('Profile Level:', ':black_circle: - ' + level, true)
          } else if (level >= 10 && !(level >= 19) ) {
            steamUserInfo.addField('Profile Level:', ':blue_circle: - ' + level, true)
          } else if (level >= 20 && !(level >= 29) ) {
            steamUserInfo.addField('Profile Level:', ':brown_circle: - ' + level, true)
          } else if (level >= 30 && !(level >= 39)) {
            steamUserInfo.addField('Profile Level:', ':green_circle: - ' + level, true)
          } else if (level >= 40 && !(level >= 49) ) {
            steamUserInfo.addField('Profile Level:', ':orange_circle: - ' + level, true)
          } else if (level >= 50 && !(level >= 99) ) {
            steamUserInfo.addField('Profile Level:', ':purple_circle: - ' + level, true)
          } else if (level >= 100 && !(level >=499)) {
            steamUserInfo.addField('Profile Level:', ':red_circle: - ' + level, true)
          } else if (level >= 500) {
            steamUserInfo.addField('Profile Level:', ':fleur_de_lis: - ' + level, true)
          }

          //steamUserInfo.addField('\u200B', '\u200B')
          const accountCreatedFullDate = new Date((information.created * 1000)).toLocaleString("en-GB", {day: "numeric", month: "numeric", year:"numeric"})
          const accountCreatedYear = new Date((information.created * 1000)).toLocaleString("en-GB", {year:"numeric"})
          const accountCreatedMonth = new Date((information.created * 1000)).toLocaleString("en-GB", {month: "numeric"})
          const accountCreatedDay = new Date((information.created * 1000)).toLocaleString("en-GB", {day: "numeric"})
          steamUserInfo.addField('\u200B', '\u200B')
          steamUserInfo.addField('Account created on:', accountCreatedFullDate + " ~ :clock12: ~ **(" + moment([accountCreatedYear, (accountCreatedMonth - 1), accountCreatedDay]).toNow(true) + " ago)**")
          steamUserInfo.addField('\u200B', '\u200B')
          if (bans.communityBanned == false) {
            steamUserInfo.addField('Community banned:', 'No', true)
          } else if (bans.communityBanned == true) {
            steamUserInfo.addField('Community banned:', ':warning: ~ Yes ~ :warning: ', true)
          }

          if (bans.vacBanned == false){
            steamUserInfo.addField('Vac Banned:', 'No', true)
          } else if (bans.vacBanned == true) {
            steamUserInfo.addField('VAC bans on record:', bans.vacBans, true)
            steamUserInfo.addField('Days since last VAC ban:', ':calendar_spiral: -- ' + bans.vacBans, true)
          }



        //console.log('https://backpack.tf/api/IGetUsers/v3?steamid='+information.id+'&key='+config.backpackTFkey);
        // got('https://backpack.tf/api/IGetUsers/v3?steamid='+id+'&key='+config.backpackTFkey).then((res) => {
          const steamID = id
          var obj = JSON.parse(res.body)
          var data = obj.response.players[steamID]
          //console.log(data)
          if (data.steamrep_scammer == true) {
            steamUserInfo.addField('SteamRep:', ":exclamation: [SCAMMER](https://steamrep.com/profiles"+steamID+") :exclamation:", true)
          }

          steamUserInfo.addField('\u200B', '\u200B')
          //steamUserInfo.setTimestamp(new Date())
          steamUserInfo.setFooter('© Midday | SteamRep data from backpack.tf | Other steam data refreshed 1 day ago.','https://avatars0.githubusercontent.com/u/33847796?s=200&v=4')

          return msg.channel.send(steamUserInfo)
          })
        })
      })
    })
  }
}
