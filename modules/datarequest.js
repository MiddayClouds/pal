/**
 *
 * @fileoverview Here are all functions where we are going to make GET requests to sites which are giving us data for given arguments.
 * @author Julian Yaman
 *
 */

// Requiring got for making requests
const got = require('got')
const config = require('./../config.json')
const Util = require('./util')

/**
 * Function which is receiving data from Wikipedia by giving a term to search in the Wikipedia Database and returns
 * short summaries.
 *
 * @param {String} url - URL for requesting data (Wikipedia)
 * @param msg - Message class of Discord.js
 * @param {String} argument - Argument sent by the user -> !wiki [argument]
 * @since 1.0.1
 *
 * @public
 */
exports.getWikipediaSummary = (url, msg, argument) => {
  got(url).then(res => {
    try {
      let pageContent = JSON.parse(res.body).query.pages
      let keys = Object.keys(pageContent)

      let summary

      if (pageContent[keys[0]].extract.split('.', 2).length <= 1) {
        summary = 'Click on the Link above to see the Wikipedia article about ' + pageContent[keys[0]].title
      } else {
        // First lines of the Wikipedia article
        summary = pageContent[keys[0]].extract.toString().match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g)

        summary = summary[0] + summary[1]

        // console.log(summary);
        // console.log("-----");
        // let stringSplitting = pageContent[keys[0]].extract.toString().match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
        // console.log(stringSplitting[0] + stringSplitting[1]);

        // Replacing all HTML Tags included in the text
        summary = summary.replace(/<(?:.|\n)*?>/gm, '')
      }

      // HTTPS Request for receiving the URL of the article by giving the page ID as the value for the pageids parameter in the API request to Wikipedia
      got('https://en.wikipedia.org/w/api.php?action=query&prop=info&format=json&inprop=url&pageids=' + pageContent[keys[0]].pageid).then(pageres => {
        try {
          // JSON data of the page with the page id pageid
          let pageObject = JSON.parse(pageres.body).query.pages

          let key = Object.keys(pageObject)

          // Get the value of the fullurl parameter
          let wikipediaArticleLink = pageObject[key[0]].fullurl

          // Sending the final result of the two requests as an embed to the channel where the command
          // was executed.
          msg.channel.send({
            embed: {
              color: 3447003,
              author: {
                icon_url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
                name: 'Wikipedia'
              },
              title: pageContent[keys[0]].title + ' (wikipedia article)',
              url: wikipediaArticleLink,
              description: summary,
              timestamp: new Date(),
              footer: {
                icon_url: 'https://upload.wikimedia.org/wikipedia/en/2/28/WikipediaMobileAppLogo.png',
                text: 'Information by Wikipedia. wikipedia.org'
              }
            }
          })
        } catch (e) {
          msg.react('⛔')
          msg.channel.send(
            'You got a very rare error here, how did you get that? Write it to our GitHub Repository\n' +
            'https://github.com/sleme/pal-bot')
        }
      })
    } catch (e) {
      msg.react('⛔')
      msg.channel.send(
        'Cannot get data from Wikipedia. Please check your spelling and upper and lower case. (Mostly it is upper and lower case because Wikipedia pay attention to it.)\n' +
        '```You´ve sent the value: ' + argument + '```')
    }
  }).catch(error => {
    console.log(error.response.body)
  })
}


/**
 * Search GIF with given term
 * @param msg - Message class of Discord.js
 * @param {String} searchQuery - Search tag for searching a GIF in GIPHY.
 * @since masterBranch-1.3
 *
 * @public
 */
exports.getGifFromGIPHY = (msg, searchQuery) => {
  got('http://api.giphy.com/v1/gifs/random?api_key=' + config.giphyKey + '&tag=' + searchQuery).then(res => {
    try {
      let result = JSON.parse(res.body)
      return msg.channel.send(result.data.image_original_url)
    } catch (e) {
      console.error(e)
      throw new Error('GIF command didnt work: please check error exception.')
    }
  })
}
