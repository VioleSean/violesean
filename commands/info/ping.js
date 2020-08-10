const Discord = require("discord.js");
module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, message, args) => {
    message.channel.send(`🏓 Pinging . . . .`).then((msg) => {
      const _ = new Discord.MessageEmbed()
        .setTitle("🏓Pong🏓")
        .setDescription(`🏓🏓🏓\nLatency is \*\*${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\*\* MS\nAPI Latency is \*\*${Math.round(client.ws.ping)}\*\* MS\n🏓🏓🏓`)
        .setColor("RANDOM");
      msg.edit(_);
      msg.edit("\u200B");
    });
  },
};
//Pong ping !!!
