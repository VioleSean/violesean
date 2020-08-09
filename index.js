const { token, prefix } = require("./config.json")
const { config } = require("dotenv");
const discord = require("discord.js") //Gonna use Discord.js Module xD
const client = new discord.Client({
  disableEveryone: true // what does this disable thing do?
});

const db = require("quick.db")

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

 }) //All codes link in description

//GONNA USE EVENT HERE

client.on("guildMemberAdd", (member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let wembed = new discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.displayAvatarURL())
  .setColor("#ff2050")
  .setThumbnail(member.user.displayAvatarURL())
  .setDescription(`We are very happy to have you in our server`)
  .setTimestamp()
  client.channels.cache.get(chx).send(wembed)
})


client.login(token)