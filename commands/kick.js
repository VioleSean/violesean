module.exports = {
	name: 'kick',
	description: 'Kick a user from the server.',
  guildOnly: true,
  execute(message, member) {
    const taggedUser = message.mentions.users.first();
    if(taggedUser) {
    const member = message.guild.member(taggedUser);
      if(member) {
       member
        .kick('Optional reason that will display in the audit logs')
        .then(() => {
        // We let the message author know we were able to kick the person
        message.reply(`Successfully kicked ${taggedUser.tag}`);
      })
        .catch(err => {
         // An error happened
         // This is generally due to the bot not being able to kick the member,
         // either due to missing permissions or role hierarchy
         message.reply('I was unable to kick the member');
         // Log the error
        console.error(err);
      });
        
      } else {
      // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      } else {
        message.reply("You didn't mention the user to kick!");
      }
	},
};