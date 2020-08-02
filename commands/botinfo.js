const { Discord , Client } = require('../index.js');
module.exports = {
	name: 'botinfo',
  cooldown: 5,
	description: 'INFORMATION BOT',
	execute(message, args) {
		message.channel.send(`**INFORMATION BOT**\n**-------------------------**\n**Name**\n@VioleSean#7363 \n**Made By**\n@null\n**BOT invite Link**\nhttps://discord.com/oauth2/authorize?client_id=737188432803266561&scope=bot&permissions=2146958847`);
	},
};
