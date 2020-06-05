const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  // let taggedUser = ''
  // if (!message.mentions.users.size) {
  //   try {
  //     taggedUser = message.guild.members.fetch({ query: args[0], limit: 1 })
  //     .then(member => console.log(member.get("user")))
  //     //console.log(taggedUser);
  //   } catch (e) {
  //
  //   }
  // }
  //
  // console.log(args[0]);
  // console.log(message.guild.members.fetch({ query: args[0], limit: 1 }));
  //
  // let taggedUser = message.guild.member(message.mentions.members.first())
  // if (!message.mentions.users.size) {
  //   try {
  //     console.log(message.guild.members.get(args[0]).id);
  //     //taggedUser = message.guild.members.fetch(args[0]);
  //     return taggedUser = message.guild.member(message.guild.members.fetch(args[0]));
  //
  //   } catch (e) {
  //     console.log(e);
  //     return message.reply('fuck you');
  //   }
  //   return message.reply('You need to tag a user to embarrass them.');
  // }


  let taggedUser = message.guild.member(message.mentions.members.first())
  if (!message.mentions.users.size) {
    return message.reply('You need to tag a user to embarrass them.');
  }

  if (message.channel.permissionsFor(message.guild.me).has('MANAGE_WEBHOOKS')) {
    const messageActions = [
      "I shit myself??",
      "I'll have you know I stubbed my toe last week while watering my spice garden and I only cried for *20 minutes*",
      'I still don´t know how to tie shoes...',
      'I stole kitkats from the store',
      'My daddy still makes my bed ;(',
      'I pee my trousers when i get excited :( ',
      'i watch bnha unironically',
      'my mom checks my phone',
      `Shoot! It's past my bed time!`
    ]
    const randAction = messageActions.random()
    const taggedUser = message.guild.member(message.mentions.members.first())
    if (taggedUser == '300955174225051650') {
      return message.reply(`I can't embarrass myself, that's super embarrassing!`);
    }
    //console.log(taggedUser.id);
    let customAction = args
    customAction.shift()
    function deleteHooks() {
      message.channel.fetchWebhooks()
      .then(channelWebhhooks => {
        channelWebhhooks.forEach(webhook => {
          if (channelWebhhooks.owner === client.id) {
            const tempHook = new Discord.WebhookClient(webhook.id,webhook.token)
            tempHook.delete(`Embarrass autohook deleter`)
          }
        })
      })
    }
    if (args[0] == null) {
      message.channel.createWebhook(
        taggedUser.user.username, {avatar: taggedUser.user.displayAvatarURL()}
      ).then(webhook => {
        webhook.send(randAction)
        setTimeout(function () {
          deleteHooks()
          message.delete()
        }, 2000);
      })
    } else {
      message.channel.createWebhook(
        taggedUser.user.username, {avatar: taggedUser.user.displayAvatarURL()}
      ).then(webhook => {
        webhook.send(customAction.join(' '))
        setTimeout(function () {
          deleteHooks()
          message.delete()
        }, 2000);
      })
    }
  } else {
    message.react('704826179500245042')
    message.channel.send({
      embed: {
        title: ":no_entry: | I do not have WebHook permissions for this channels or server. Please allow my role to manage webhooks. "
      }
    })
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["embarass","embarras","embs"],
  permLevel: "User",
  cooldown: 10
};

exports.help = {
  name: "embarrass",
  category: "Fun",
  description: "Outputs a webhook (with the tagged user's name and profile image) and a random message or your custom specified message.",
  usage: "embarrass <@user> OR embarrass <@user> text"
};
