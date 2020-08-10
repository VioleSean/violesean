const { prefix } = require("./config.json")
const { config } = require("dotenv");
const discord = require("discord.js") 
const client = new discord.Client({
  disableEveryone: true 
});


client.commands = new discord.Collection();
client.aliases = new discord.Collection();


["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client)
})



client.on("ready", () => { //When bot is ready
  client.user.setActivity(`${client.user.username} | ${prefix}help`, {type: "PLAYING"});
  console.log(`Hello,${client.user.username} is Online! | ${client.ws.ping}`)
})

client.on("message", async message => {
  
if(message.author.bot) return;
  if(!message.guild) return;

  if(!message.content.startsWith(prefix)) return;
  
     if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);

 }) 

client.login(process.env.TOKEN)
