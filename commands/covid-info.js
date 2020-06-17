exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const api = require("novelcovid");
  // Define the embed.
  const countryInfo = new Discord.MessageEmbed();

  // If no specific country is called, show global stats.
  if (!args[0]) {
    api.all().then((recievedData) => {
      countryInfo.setTitle("Worldwide Statistics");
      // countryInfo.setURL('https://discord.js.org/')
      // countryInfo.setAuthor('Data by disease.sh',
      // 'https://cdn.discordapp.com/icons/689535536934813823/0cf582f280a100016d775994a7e4ba08.jpg',
      // 'https://disease.sh/') countryInfo.setDescription('Some description
      // here')
      countryInfo.setThumbnail("https://feen.us/uc38db.png");
      countryInfo.addFields(
        {
          name: "Total Cases:",
          value: new Intl.NumberFormat("en-us").format(recievedData.cases),
          inline: true,
        },
        {
          name: "Cases Today:",
          value: new Intl.NumberFormat("en-us").format(recievedData.todayCases),
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Total Deaths:",
          value: new Intl.NumberFormat("en-us").format(recievedData.deaths),
          inline: true,
        },
        {
          name: "Deaths Today:",
          value: new Intl.NumberFormat("en-us").format(
            recievedData.todayDeaths
          ),
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "Total Recovered:",
          value: new Intl.NumberFormat("en-us").format(recievedData.recovered),
          inline: true,
        },
        //{ name: 'Recovered Today:', value: new
        //Intl.NumberFormat('en-us').format(recievedData.todayRecovered),
        //inline: true },
        { name: "\u200B", value: "\u200B" }
        //{ name: 'Active Cases:', value: new
        //Intl.NumberFormat('en-us').format(recievedData.active), inline: true
        //}, { name: 'Critical Active Cases:', value: new
        //Intl.NumberFormat('en-us').format(recievedData.critical), inline:
        //true },
      );
      // console.log(recievedData);
      countryInfo.setFooter(
        "Data by disease.sh | Data last updated: ",
        "https://cdn.discordapp.com/icons/689535536934813823/0cf582f280a100016d775994a7e4ba08.jpg"
      );
      countryInfo.setTimestamp(recievedData.updated);
      message.channel.send(countryInfo);
    });
  } else {
    // Define the search country.
    const country = args[0];

    api.countries({ country: country }).then((recievedData) => {
      // Check if the country exists.
      if (recievedData.country == null) {
        message.reply("That country does not exist / is not on the database!");
      } else {
        // If the country exists execute the following.

        countryInfo.setTitle("Covid-19 Statistics for " + recievedData.country);
        // countryInfo.setURL('https://discord.js.org/')
        countryInfo.setDescription(
          `:busts_in_silhouette: Country Population: ${new Intl.NumberFormat(
            "en-us"
          ).format(recievedData.population)}\n:map: Country Continent: ${
            recievedData.continent
          }`
        );
        countryInfo.setThumbnail(recievedData.countryInfo.flag);
        countryInfo.addFields(
          {
            name: "Total Cases:",
            value: new Intl.NumberFormat("en-us").format(recievedData.cases),
            inline: true,
          },
          {
            name: "Cases Today:",
            value: new Intl.NumberFormat("en-us").format(
              recievedData.todayCases
            ),
            inline: true,
          },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Total Deaths:",
            value: new Intl.NumberFormat("en-us").format(recievedData.deaths),
            inline: true,
          },
          {
            name: "Deaths Today:",
            value: new Intl.NumberFormat("en-us").format(
              recievedData.todayDeaths
            ),
            inline: true,
          },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Total Recovered:",
            value: new Intl.NumberFormat("en-us").format(
              recievedData.recovered
            ),
            inline: true,
          },
          //{ name: 'Recovered Today:', value: new
          //Intl.NumberFormat('en-us').format(recievedData.todayRecovered),
          //inline: true },
          { name: "\u200B", value: "\u200B", inline: true },
          { name: "\u200B", value: "\u200B", inline: false },
          {
            name: "Active Cases:",
            value: new Intl.NumberFormat("en-us").format(recievedData.active),
            inline: true,
          },
          {
            name: "Critical Active Cases:",
            value: new Intl.NumberFormat("en-us").format(recievedData.critical),
            inline: true,
          },
          { name: "\u200B", value: "\u200B" }
        );
        countryInfo.setTimestamp(recievedData.updated);
        countryInfo.setFooter(
          "Data by disease.sh | Data last updated: ",
          "https://cdn.discordapp.com/icons/689535536934813823/0cf582f280a100016d775994a7e4ba08.jpg"
        );
        // console.log(recievedData)
        message.channel.send(countryInfo);
      }
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["covid", "covid19", "disease"],
  permLevel: "User", // Who can use it
  cooldown: 5,
};

exports.help = {
  name: "covid-info",
  category: "Miscelaneous",
  description: "Gives information on Covid-19 cases.",
  usage: "`covid-info` OR `covind-info <country>`",
};
