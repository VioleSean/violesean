module.exports = {
	name: 'server',
  cooldown: 5,
	description: 'SERVER INFO',
	execute(message, args) {
		return message.channel.send(`>>> **SERVER INFO**\n**-----------------**\n**Name SERVER**\n\`${message.guild.name}\`\n**Total Member**\n         \`${message.guild.memberCount}\``);     
	},
};
    
