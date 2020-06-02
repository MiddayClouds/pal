/*
Logger class for easy and aesthetically pleasing console logging
*/
const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const config = require("./../config.js");

exports.log = (content, type = "log") => {
  const palrevealer = new Discord.WebhookClient(config.revealerhook[0], config.revealerhook[1])
  const timestamp = ` Date: ${moment().format("DD/MM/YYYY")} | Time: ${moment().format("HH:mm:ss (Z)")}`;
  switch (type) {
    case "log": {
      console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
      return palrevealer.send("```LOG:" + timestamp + " --> " + content + "```")
    }
    case "warn": {
      console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
      return palrevealer.send("```WARN:" + timestamp + " --> " + content + "```")
    }
    case "error": {
      console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
      return palrevealer.send("```ERROR:" + timestamp + " --> " + content + "```")
    }
    case "debug": {
      console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
      return palrevealer.send("```DEBUG:" + timestamp + " --> " + content + "```")
    }
    case "cmd": {
      console.log(`${timestamp}\n${chalk.black.bgWhite(type.toUpperCase())} \n${content}`);
      return palrevealer.send("```[ Log type: CMD ]\n[ Timestamp:" + timestamp + " ]\n" + content + "```")
    }
    case "ready": {
      console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
      return palrevealer.send("```READY:" + timestamp + " --> " + content + "```")
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
