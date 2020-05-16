// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (args[0] == "clean") {
    try {
      args.shift()
      const code = args.join(" ");
      const evaled = eval(code);
      const clean = await client.clean(client, evaled);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    }
  } else {
    try {
      const code = args.join(" ");
      const evaled = eval(code);
      const clean = await client.clean(client, evaled);
      message.channel.send(":inbox_tray: (Input) ```js\n"+evaled+"```")
      message.channel.send(":outbox_tray: (Output) ```js\n"+clean+"```")
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  cooldown: 10
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]"
};
