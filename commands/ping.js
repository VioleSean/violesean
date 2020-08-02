module.exports = {
	name: 'ping',
  cooldown: 5,
	description: 'ping.',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};