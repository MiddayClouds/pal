// Any module required will be written up here
const Util = require('./../modules/util')

/**
 * Command: embarrass
 * Description: This command creates a webhook that impersonates a user. It changes the webhook image and name to the tagged user's. Once this has been done it sends a random message through the webhook.
 * */

module.exports = {
	name: 'embarrass',
  alias: ['embarrass','embarass','embarras','shame','embaras'],
	description: 'This command creates a webhook that impersonates a user. It changes the webhook image and name to the tagged user`s. Once this has been done it sends a random message through the webhook.',
	execute(message, args, config) {
    // Start of command:

    if (message.channel.permissionsFor(message.guild.me).has('MANAGE_WEBHOOKS')) {
      try {
        const things = ["I shit myself??", "I'll have you know I stubbed my toe last week while watering my spice garden and I only cried for *20 minutes*", 'I still don´t know how to tie shoes...', 'I stole kitkats from the store', 'My daddy still makes my bed ;(', 'I pee my trousers when i get excited :( ', 'i watch bnha unironically', 'my mom checks my phone', `Shoot! It's past my bed time!`]
        const randActions = things[Math.floor(Math.random() * things.length)]
        const member = message.guild.member(message.mentions.members.first())
        if (member.user.id === '300955174225051650') {
          message.channel.send({embed: {title: "I can't embarrass myself, that's embarrassing!"}})
        } else {
          message.channel.createWebhook(
            member.user.username, member.user.displayAvatarURL()
          ).then(webhook =>
            webhook.edit({name: member.user.username, avatar: member.user.displayAvatarURL()})
          ).then(webhook =>
            webhook.send(randActions)
          ).then(webhook => {
            setTimeout(function () {
              webhook.delete(['Auto delete after 1 minute'])
              console.log("Webhook should be deleted.")
            }, 60000)
          }).catch(console.error)
        }
      } catch (err) { console.console.error('error'); }
    } else {
      message.channel.send({
        embed: {
          title: "I don't have the pemission to!"
        }
      })
    }
  },
}
