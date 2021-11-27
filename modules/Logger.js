/*
Logger class for easy and aesthetically pleasing console logging
*/
const Discord = require("discord.js");
const { cyan, red, magenta, gray, yellow, white, green } = require("colorette");
const { Timestamp } = require("@sapphire/time-utilities");
const config = require("./../config.js");

exports.log = (content, type = "log") => {
  const palrevealer = new Discord.WebhookClient(config.revealerhook[0], config.revealerhook[1]);
  const timestamp = `${cyan(new Timestamp("DD/MM/YYYY HH:mm:ss (Z)"))} | `;
  const displayStamp = ` ${new Timestamp("DD/MM/YYYY HH:mm:ss (Z)")}`;
  switch (type) {
    case "log": {
      console.log(`${timestamp} ${gray(type.toUpperCase())} ${content} `);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + displayStamp + "\nLOG:: " + content + "\n```");
    }
    case "warn": {
      console.log(`${timestamp} ${yellow(type.toUpperCase())} ${content} `);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + displayStamp + "\nWARN:: " + content + "\n```");
    }
    case "error": {
      console.log(`${timestamp} ${red(type.toUpperCase())} ${content} `);
      return palrevealer.send(":sos: ```asciidoc\nTIMESTAMP::" + displayStamp + " \nERROR:: " + content + "\n```");
    }
    case "debug": {
      console.log(`${timestamp} ${magenta(type.toUpperCase())} ${content} `);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + displayStamp + "\nDEBUG:: " + content + "\n```");
    }
    case "cmd": {
      console.log(`TIMESTAMP:: ${timestamp}\nLOG TYPE & COMMAND:: ${white(type.toUpperCase())} || ${content}\n`);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + displayStamp +"\nCOMMAND:: " + content + "\n```");
    }
    case "ready": {
      console.log(`${timestamp} ${green(type.toUpperCase())} ${content}`);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + displayStamp + "\nREADY:: " + content + "\n```");
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
