const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {

  if (!message.mentions.users.size) {
    return message.reply('You need to tag a user to display information bout them.');
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
    message.channel.createWebhook(
      taggedUser.user.username, {avatar: taggedUser.user.displayAvatarURL()}
    ).then(webhook => {
      webhook.send(randAction)
      deleteHooks()
    })
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
  aliases: [],
  permLevel: "User",
  cooldown: 10
};

exports.help = {
  name: "embarrass",
  category: "Miscelaneous",
  description: "Creates a webhook and embarrassess the tagged user.",
  usage: "embarrass @user"
};
