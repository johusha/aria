require('dotenv').config()

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');
const guildId = process.env.DISCORD_GUILD_ID
const clientId = process.env.DISCORD_CLIENT_ID
/* Commands
  /aria radio 
*/

const commands = [

  new SlashCommandBuilder()
    .setName('aria')
    .setDescription('Play Audius in your Discord')
    .addSubcommand(subcommand =>
      subcommand
        .setName('demo')
        .setDescription('Plays some top 100 tracks from Audius')
        // .addStringOption(option =>
        //   option.setName('radio')
        //     .setDescription('choose a radio station to play')
        //     .setRequired(true)
        // )
      ),
  new SlashCommandBuilder()
    .setName('dj3000')
    .setDescription('core engine commands and stuff')
    .addSubcommand(subcommand =>
      subcommand
        .setName('bot')
        .setDescription('joins the voice channel')
        .addStringOption(option =>
          option.setName('voice')
            .setDescription('tells the bot to do a voice thing')
            .setRequired(true)
            .addChoice('join', 'emoji_join')
            .addChoice('leave', 'emoji_leave')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('controls the server stuff')
      )
]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);