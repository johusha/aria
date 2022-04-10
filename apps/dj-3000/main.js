const wait = require('../../packages/utils/wait')
const { Intents, MessageEmbed } = require('discord.js');
const { DiscordClient } = require('./app/discord')


const { requestAudiusNodes, requestTopTracks, requestSongData } = require('./app/station')
const { joinVoiceChannel, createAudioResource, createAudioPlayer, entersState } = require('@discordjs/voice');
const { StreamType, VoiceConnectionStatus, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');


const randy = arr => arr[Math.floor(Math.random() * arr.length)]

const FLAGS = {
  SHOULD_RETRY: false,
  MAX_RETRY_ATTEMPTS: 3
}

const MOODS = {
  'Peaceful': 'A Peaceful 🕊',
  'Romantic': 'A Romantic 💘',
  'Sentimental': 'A Sentimental 😢',
  'Tender': 'A Tender 😌',
  'Easygoing': 'An Easygoing 🙂',
  'Yearning': 'A Yearning 👀',
  'Sophisticated': 'A Sophisticated 🧐',
  'Sensual': 'A Sensual 😘',
  'Cool': 'A Cool 😎',
  'Gritty': 'A Gritty 😡',
  'Melancholy': 'A Melancholy 🌧',
  'Serious': 'A Serious 😐',
  'Brooding': 'A Brooding 🤔',
  'Fiery': 'A Fiery 🔥',
  'Defiant': 'A Defiant 😈',
  'Aggressive': 'An Aggressive 🤬',
  'Rowdy': 'A Rowdy 🤠',
  'Excited': 'An Excited 🎉',
  'Energizing': 'An Energizing 🤩',
  'Empowering': 'An Empowering 💪',
  'Stirring': 'A Stirring 😲',
  'Upbeat': 'An Upbeat 🙌',
  'Other': 'A "Other 🤷"',
}

// create the station (main app)
// load configuration and do startup stuff
// build the shows and stuff

// instantialize the core station components
// eg. decks and equipment, producer, broadcasting stuff, ...

class PlayerThing {

}

class HostThing {

}

class RadioShow {

}
class ControllerThing {

}

class CoreAppThing {
  constructor(dependencies = {}) {
    const { player, host, show } = dependencies
    
    this.player = player ?? new PlayerThing()
    this.host = host ?? new HostThing()
    this.show = show ?? new RadioShow()
    this.tracks = []

    this.online = false
    this.numRetries = 0
  }

  isOnline() {
    return this.online
  }
  numRetries() {
    return this.numRetries
  }

}

let App = new CoreAppThing()

// pass tracklists and stuff
// eg. to cache current playlists and show states
async function initialize(data) {
  let app = App ?? new CoreAppThing(data)

  const { player, host, show } = app

  let audius = null
  const controller = new ControllerThing()
  try {
    audius = await requestAudiusNodes()
  } catch(err) {
    console.error('CRASH')
    throw err
  }

  

  // Filter genres
  const GENRES = {
    ALL: 'All Genres',
    ELECTRONIC: 'Electronic',
    ROCK: 'Rock',
    METAL: 'Metal',
    ALTERNATIVE: 'Alternative',
    HIP_HOP_RAP: 'Hip-Hop/Rap',
    EXPERIMENTAL: 'Experimental',
    PUNK: 'Punk',
    FOLK: 'Folk',
    POP: 'Pop',
    AMBIENT: 'Ambient',
    SOUNDTRACK: 'Soundtrack',
    WORLD: 'World',
    JAZZ: 'Jazz',
    ACOUSTIC: 'Acoustic',
    FUNK: 'Funk',
    R_AND_B_SOUL: 'R&B/Soul',
    DEVOTIONAL: 'Devotional',
    CLASSICAL: 'Classical',
    REGGAE: 'Reggae',
    PODCASTS: 'Podcasts',
    COUNTRY: 'Country',
    SPOKEN_WORK: 'Spoken Word',
    COMEDY: 'Comedy',
    BLUES: 'Blues',
    KIDS: 'Kids',
    AUDIOBOOKS: 'Audiobooks',
    LATIN: 'Latin',

    // Electronic Subgenres
    TECHNO: 'Techno',
    TRAP: 'Trap',
    HOUSE: 'House',
    TECH_HOUSE: 'Tech House',
    DEEP_HOUSE: 'Deep House',
    DISCO: 'Disco',
    ELECTRO: 'Electro',
    JUNGLE: 'Jungle',
    PROGRESSIVE_HOUSE: 'Progressive House',
    HARDSTYLE: 'Hardstyle',
    GLITCH_HOP: 'Glitch Hop',
    TRANCE: 'Trance',
    FUTURE_BASS: 'Future Bass',
    FUTURE_HOUSE: 'Future House',
    TROPICAL_HOUSE: 'Tropical House',
    DOWNTEMPO: 'Downtempo',
    DRUM_AND_BASS: 'Drum & Bass',
    DUBSTEP: 'Dubstep',
    JERSEY_CLUB: 'Jersey Club',
    VAPORWAVE: 'Vaporwave',
    MOOMBAHTON: 'Moombahton'
  }

  const bannedGenres = [
    GENRES.ROCK,
    GENRES.METAL,
    GENRES.HIP_HOP_RAP,
    GENRES.PUNK,
    GENRES.FOLK,
    GENRES.POP,
    GENRES.SOUNDTRACK,
    GENRES.WORLD,
    GENRES.FUNK,
    GENRES.R_AND_B_SOUL,
    GENRES.DEVOTIONAL,
    GENRES.CLASSICAL,
    GENRES.REGGAE,
    GENRES.COUNTRY,
    GENRES.SPOKEN_WORK,
    GENRES.COMEDY,
    GENRES.BLUES,
    GENRES.KIDS,
    GENRES.AUDIOBOOKS,
    GENRES.LATIN,
    GENRES.DEEP_HOUSE,
    GENRES.DISCO,
    GENRES.HARDSTYLE,
    GENRES.TROPICAL_HOUSE,
    GENRES.DUBSTEP,
    GENRES.JERSEY_CLUB,
    GENRES.MOOMBAHTON,
  ]

  const bannedArtists = [
    'AudiusRadio'
  ]

  async function load(audius) {
    console.log('caching top tracks...')
    // let topTracks = null

    // if (app.tracks == undefined) {
    const topTracks = await requestTopTracks(audius)
      .then(tracks => tracks.filter(a => bannedGenres.includes(a.genre) == false))
      .then(tracks => tracks.filter(a => bannedArtists.includes(a.user.name) == false))
      .then(tracks => tracks.filter(a => a.duration <= 420))
      // console.log({ topTracks })
      // app.tracks = topTracks
    // }

    // topTracks.map(a => console.log(a.genre))

    console.log('song url: ...')
    const track = randy(topTracks)
    const song = await requestSongData(audius, track)
    // console.log({ song })

    // Create the audio resource
    console.log('creating the resource')
    const resource = createAudioResource(song.url, {
      inputType: StreamType.Arbitrary,
    });

    return { resource, track }
  }


  // get audius api
  

  const discord = new DiscordClient({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES]
  })

  discord.client.on('ready', event => {
    console.log('the discord client is ready')
  })

  discord.client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (interaction.commandName === 'aria') {
      if (interaction.options.getSubcommand() === 'demo') {

        // Start Command
        console.log('creating audio player')
        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Play,
          }
        });

        player.on('error', error => {
          console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        })




        // Voice Command
        // TODO: convert to api v13
        const channel = interaction.member.voice.channel;

        if (channel == undefined) {
          interaction.reply({
            content: '💩 Oops! Join a voice channel first!',
            ephemeral: true
          })
          return false
        }

        // Voice Connection
        // no need to store the connection state since it can get got from the discord.js
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: interaction.guild.voiceAdapterCreator,
        })

        // Watch for state changes
        connection.on('stateChange', (oldState, newState) => {
          if (oldState == newState)
            return;

          console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
        });
        connection.on(VoiceConnectionStatus.Ready, () => {
          console.log('Connection is in the Ready state!');
        });

        connection.subscribe(player)


        let channelCommandSentFrom = discord.client.channels.cache.get(interaction.channel.id);



        async function start(audius, flag) {
          const data = await load(audius)

          let { resource, track } = data
          player.play(resource)

          console.log({ track })

          const metadata = {
            title: track.title,
            description: track.description,
            albumArt: track.artwork['480x480'],
            trackLink: `https://audius.co${track.permalink}`,
            authorName: track.user.name,
            authorUrl: `https://audius.co/${track.user.name}`,
            authorPFP: track.user.profile_picture['150x150']
          }

          console.log(metadata)

          const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${metadata.title ?? 'Some Song Title'}`)
            .setURL(`${metadata.trackLink ?? 'https://audius.co'}`)
            .setAuthor({ name: metadata.authorName, iconURL: metadata.authorPFP, url: `https://audius.co/${track.user.handle}` })
            .setDescription(`${metadata.description ?? MOODS[track.mood] + ' track.'}`)
            .setThumbnail(`${metadata.albumArt ?? 'https://i.imgur.com/AfFp7pu.png'}`)
            // .addFields(
            //   { name: 'Regular field title', value: 'Some value here' },
            //   { name: '\u200B', value: '\u200B' },
            //   { name: 'Inline field title', value: 'Some value here', inline: true },
            //   { name: 'Inline field title', value: 'Some value here', inline: true },
            // )
            // .addField('Inline field title', 'Some value here', true)
            // .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Powered by A R I A', iconURL: 'https://pbs.twimg.com/profile_images/1496632237915353092/GOW6e9yR_400x400.jpg' });

          try {
            if (!flag) {
              await interaction.reply({ embeds: [exampleEmbed],  })
              // const message = await interaction.fetchReply()
              // message.react('👍').then(() => message.react('👎'));

            } else {
              channelCommandSentFrom.send({ embeds: [exampleEmbed] })
              // const message = await interaction.fetchReply()
              // message.react('👍').then(() => message.react('👎'));

            }
          } catch(err) {
            console.warn(err)
          }

          // const embed = fancyEmbedThing(track)

          // message = await send_fn.call(this, { embeds: [embed] })


          // const filter = (reaction, user) => {
          //   return ['👍', '👎'].includes(reaction.emoji.name) && user.id === interaction.user.id;
          // };

          // if (!flag) {
          //   interaction.reply({
          //     content:
          //       `Now playing: 📻 Rebase.Radio` + `\n\n` +
          //       `Playing ${MOODS[track.mood] ?? MOODS.Other} track...` + '\n' +
          //       `${track.title}` + `\n` +
          //       `by ${track.user.name}` + '\n',
          //     ephemeral: true
          //   })
          // } else {
          //   interaction.followUp({
          //     content:
          //       `Playing ${MOODS[track.mood] ?? MOODS.Other} track...` + '\n' +
          //       `${track.title}` + `\n` +
          //       `by ${track.user.name}` + '\n',
          //     ephemeral: true
          //   })
          // }



        }

        // Load
        // let {resource, track} = await load(audius)

        // Play
        await start(audius)

        // Repeat
        // let {resource, track} = load(audius)

        player.on('stateChange', async (oldState, newState) => {
          console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
          if (oldState.status === 'playing' && newState.status === 'idle') {


            // console.log('setting playerstate to ' + newState.status)

            // playerState = newState.status
            await start(audius, true)
          }
        })
      }
    } else if (interaction,commandName === 'dj3000') {
      if (interaction.options.getSubcommand() === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
      } else if (interaction.options.getSubcommand() === 'bot') {


        // Options:
        // join
        // leave
      }

    }
  });


  // Bug: for some reason this doesn't work with quokka but it does in prod
  discord.login(process.env.DISCORD_TOKEN)

  // nothing crashed
  app.online = true
}

function handleVoiceJoin() {

}

function queueNextTrack(track) {
  // get the current tracklist
  // cache the current track if the user wants to replay
  // or to check if we're playing the same song, etc.

  // increment the index by 1
  // get track metadata and song data subroutine
  // loads up and queues the next track

  // broadcast event - the track is ready and queued up
}

function handlePlayCommand(event, player) {
  // get the voice channel from the user
  // check if the player is already attached
  // if not then attach the player

  // check to make sure the player is playing
  // if not, start it playing to the voice channels
}

function handleVoiceDisconnect() {
  // leave the voice chat to free up resources I guess
}

function handleSkipSongCommand() {
  // check if there's a song queued
  // if no song is queued, then the playlist is over
  // then generate a new tracklist

  // otherwise
  // play the next queued song
  // queue up the next song and re-generate the tracklist if needed
  
}

function handleTrackVote(vote) {
  // 👍
  // if vote is positive
  // then increase track popularity score
  // and add to liked tracklist for local top 100 programs

  // 👎
  // else if the vote is negative
  // then decrease track score and add to disliked tracklist
  // probly just go ahead and skip it then

  // if skip on dislike
  // generate a new virtual skip command to send to the bot
  handleSkipSongCommand()
}

// TODO: test passing args
async function retry(cb, ...args) {
  if (app.numRetries() > MAX_RETRY_ATTEMPTS) throw new Error('Reached max number of retries')
  
  if (FLAGS.SHOULD_RETRY) {
    app.retryCount = app.numRetries() + 1
    console.log('retrying in 3 seconds...')
    await wait(3000)
    cb.call(this, args)
  }
}

let data = {}

!(async () => {
  console.log('starting')
  await initialize(data)
    .catch(err => {
      console.error(err)
      retry(initialize, data)
    })

  console.log('initialized')

  // Audius Stuff
  // get the playlist data from audius top 100 tracks
  // randomize and create setlist (TODO: apply ratings weights)
  // load 3 tracks and start playing
  // create the discord player
  // and start playing when the track is ready


})();

console.log('done')
