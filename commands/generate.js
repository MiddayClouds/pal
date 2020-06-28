exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // Construct Discord
  const Discord = require("discord.js");
  // Create an embed
  const ganEmbed = new Discord.MessageEmbed();

  // Modules for downloading images
  const fs = require("fs");
  const request = require("request");
  const got = require("got");

  // Image generation
  //const gen = Math.floor(100000 + Math.random() * 900000);
  // const personURL = `https://www.thispersondoesnotexist.com/image.jpg?${gen}`;
  const personURL = "https://www.thispersondoesnotexist.com/image";
  const personPATH = "./images/GAN/person.jpg";
  // const artURL = `https://www.thisartworkdoesnotexist.com/artwork?${gen}`;
  const artURL = "https://www.thisartworkdoesnotexist.com/";
  const artPATH = "./images/GAN/art.jpg";
  const errors = ["100", "101", "200", "201","202","204","206","207","300","301","302","303","304","305","307","400","401","402","403","404","405","406","408","409","410","411","412","413","414","415","416","417","418","420","421","421","422","423","424","425","426","429","431","444","450","451","499","500","501","502","503","504","506","507","508","509","510","511","599"];
  const ranErrors = errors.random();

  ganEmbed.setColor("#27AE60");

  // Donwloading subroutine
  const download = (url, path, callback) => {
    request.head(url, (err, res, body) => { // eslint-disable-line no-unused-vars
      request(url)
        .pipe(fs.createWriteStream(path))
        .on("close", callback);
    });
  };

  if (args[0] === "person") {
    download(personURL, personPATH, () => {
      ganEmbed.setTitle("This person does not exist.");
      ganEmbed.setURL("https://www.thispersondoesnotexist.com/");
      ganEmbed.setFooter("Imagined by a GAN | Powered by: thispersondoesnotexist.com", "https://feen.us/xvzn8g.png");
      ganEmbed.attachFiles(["./images/GAN/person.jpg"]);
      ganEmbed.setImage("attachment://person.jpg");
      message.channel.send(ganEmbed);
    });
  } else if (args[0] === "art") {
    download(artURL, artPATH, () => {
      ganEmbed.setTitle("This piece of art does not exist.");
      ganEmbed.setURL("https://www.thisartworkdoesnotexist.com/");
      ganEmbed.setFooter("Imagined by a GAN | Powered by: thisartworkdoesnotexist.com", "https://feen.us/xvzn8g.png");
      ganEmbed.attachFiles(["./images/GAN/art.jpg"]);
      ganEmbed.setImage("attachment://art.jpg");
      message.channel.send(ganEmbed);
    });
  } else if (args[0]==="error") {
    ganEmbed.setTitle("Error " + ranErrors);
    ganEmbed.setURL("https://http.cat");
    ganEmbed.setFooter("Powered by: http.cat", "https://http.cat/favicon.png");
    ganEmbed.setImage(`https://http.cat/${ranErrors}.jpg`);
    message.channel.send(ganEmbed);
  } else if (args[0] === "quote") {
    got("http://inspirobot.me/api?generate=true").then((res) => {
      ganEmbed.setTitle("Inspiring Quote");
      ganEmbed.setURL("https://inspirobot.me/");
      ganEmbed.setFooter("Powered by: inspirobot.me", "https://inspirobot.me/website/images/favicon.png");
      ganEmbed.setImage(res.body);
      message.channel.send(ganEmbed);
    });
  } else {
    message.channel.send("Please choose an input from the avaible list:\n- `person`\n- `art`\n- `error`\n- `quote`\nExample: `" + message.settings.prefix +"generate art`");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gen","make","create"],
  permLevel: "User", // Who can use it
  cooldown: 5
};

exports.help = {
  name: "generate",
  category: "Fun",
  description: "Generate a person or artwork that does not actually exist!",
  usage: "generate OR generate person OR generate art"
};
