const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  function deleteHooks() {
    message.channel.fetchWebhooks()
      .then(channelWebhhooks => {
        channelWebhhooks.forEach(webhook => {
          if (channelWebhhooks.owner === client.id) {
            const tempHook = new Discord.WebhookClient(webhook.id,webhook.token);
            tempHook.delete("Embarrass autohook deleter");
          }
        });
      });
  }

  if (!message.mentions.users.size) {
    return message.reply("You need to tag a user to embarrass them.");
  }

  if (message.channel.permissionsFor(message.guild.me).has("MANAGE_WEBHOOKS")) {
    const messageActions = [
      "I shit myself??",
      "I'll have you know I stubbed my toe last week while watering my spice garden and I only cried for *20 minutes*",
      "I still don´t know how to tie shoes...",
      "I stole kitkats from the store",
      "My daddy still makes my bed ;(",
      "I pee my trousers when i get excited :( ",
      "i watch bnha unironically",
      "my mom checks my phone",
      "Shoot! It's past my bed time!"
    ];
    const randAction = messageActions.random();
    const taggedUser = message.guild.member(message.mentions.members.first());
    if (taggedUser == "300955174225051650") {
      return message.reply("I can't embarrass myself, that's super embarrassing!");
    }

    const customAction = args;
    customAction.shift();

    if (args[0] == null) {
      message.channel.createWebhook(
        taggedUser.user.username, {avatar: taggedUser.user.displayAvatarURL()}
      ).then(webhook => {
        webhook.send(randAction);
        setTimeout(function() {
          deleteHooks();
          message.delete();
        }, 2000);
      });
    } else {
      message.channel.createWebhook(
        taggedUser.user.username, {avatar: taggedUser.user.displayAvatarURL()}
      ).then(webhook => {
        webhook.send(customAction.join(" "));
        setTimeout(function() {
          deleteHooks();
          message.delete();
        }, 2000);
      });
    }
  } else {
    message.react("710291890465144872");
    message.channel.send({
      embed: {
        color: 12597547,
        title: ":no_entry:\nI do not have the `MANAGE_WEBHOOKS` permission for this channels or server!\nPlease make sure Pal's permissions are correctly set up.\nFor more information on how to do this please run the `rebuild` command."
      }
    });
  }
};

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
  usage: "`embarrass <@user>` OR `embarrass <@user> text`"
};
