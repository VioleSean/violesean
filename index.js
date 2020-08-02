const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
// const ytdl = require('ytdl-core');
// const opus = require('opusscript');

const {prefix,token} = require('./config.json');
const { Client, MessageEmbed } = require('discord.js');

const cooldowns = new Discord.Collection();

//
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
//


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("YOU", {type: "WATCHING"});
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name == 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}\n**Member** : __**#${member.guild.memberCount}**__`);
});

client.on('message', message => {
const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();

  
const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
 if (!command) return;
  
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
  }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`!${command.name}\` command.`);
	}
}

timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}

	if (command.guildOnly && message.channel.type != 'text') {
	return message.reply('I can\'t execute that command inside DMs!');
	}
  
  if(message.author.bot) return;
  if(message.channel.type == 'dm') return;
  

  //command
	if (command == 'ping') {
	client.commands.get('ping').execute(message, args);
	}
  if (command == 'beep') {
	client.commands.get('beep').execute(message, args);
	} 
  if (command == 'server') {
	client.commands.get('server').execute(message, args);
	}
  if (command == 'kick') {
    client.commands.get('kick').execute(message, args);
  }
  if (command == 'reload') {
    client.commands.get('reload').execute(message, args);
  }
  if(command == 'help') {
    client.commands.get('help').execute(message, args);
   }
  if(command == 'prune') {
    client.commands.get('prune').execute(message, args);
    const amount = parseInt(args[0]);
  }

});

client.login(process.env.TOKEN);
