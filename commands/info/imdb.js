const discord = require("discord.js");
const imdb = require("imdb-api");

module.exports = {
name: "imdb",
  description: "Get the information about series and movie",
  category: "info",
  usage: "imdb <name>",
  run: async (client, message, args, color) => {
    
    if(!args.length) {
      return message.channel.send("Please give the name of movie or series")
    }
    
    const imob = new imdb.Client({apiKey: "5e36f0db"}) //You need to paste you imdb api
    
    let movie = await imob.get({'name': args.join(" ")})
    
    let embed = new discord.MessageEmbed()
    .setTitle(movie.title)
    .setColor("#ff2050")
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .addField("Country", movie.country, true)
    .addField("Languages", movie.languages, true)
    .addField("Type", movie.type, true)
    .addField("Ratings",`⭐${movie.rating}`)
    .addField("Year", movie._yearData, true)
    .addField("Release", movie.released, true);
    
    
    message.channel.send(embed)
    
  }

}
