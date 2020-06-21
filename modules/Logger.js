/*
Logger class for easy and aesthetically pleasing console logging
*/
const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const config = require("./../config.js");

exports.log = (content, type = "log") => {
  const palrevealer = new Discord.WebhookClient(config.revealerhook[0], config.revealerhook[1]);
  const timestamp = ` ${moment().format("DD/MM/YYYY")} | ${moment().format("HH:mm:ss (Z)")}`;
  switch (type) {
    case "log": {
      console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + timestamp + "\nLOG:: " + content + "\n```");
    }
    case "warn": {
      console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + timestamp + "\nWARN:: " + content + "\n```");
    }
    case "error": {
      console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
      return palrevealer.send(":sos: ```asciidoc\nTIMESTAMP::" + timestamp + " \nERROR:: " + content + "\n```");
    }
    case "debug": {
      console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + timestamp + "\nDEBUG:: " + content + "\n```");
    }
    case "cmd": {
      console.log(`TIMESTAMP:: ${timestamp}\nLOG TYPE & COMMAND:: ${chalk.black.bgWhite(type.toUpperCase())} || ${content}\n`);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + timestamp +"\nCOMMAND:: " + content + "\n```");
    }
    case "ready": {
      console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
      return palrevealer.send("```asciidoc\nTIMESTAMP::" + timestamp + "\nREADY:: " + content + "\n```");
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
