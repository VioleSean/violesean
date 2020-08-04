const { MessageEmbed } = require("discord.js")
const {prefix} = require("../system/../../config.json")

module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    usage: `${prefix}ping`,
    run: async (client, message, args) => {
       const msg = await message.channel.send('🏓 Pinging....')
       const embed = new MessageEmbed()
       .setTitle('🏓PONG!🏓')
       .setDescription(`🏓🏓🏓\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)} MS\nAPI Latency is ${Math.round(client.ws.ping)} MS\n🏓🏓🏓`)
       .setThumbnail(`https://i.pinimg.com/originals/06/bd/f8/06bdf8ad69ff62062ae7dceb250d8866.gif`)
       .setColor('RANDOM')
       msg.edit(embed)
    }
}
