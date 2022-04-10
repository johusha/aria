require('dotenv').config()
const events = require('events')

const { Client, Intents } = require('discord.js');

class DiscordClient {
  constructor(args = { intents: [Intents.FLAGS.GUILDS] }) {
    const { intents } = args

    this.emitter = new events.EventEmitter()
    this.client = new Client({ intents: intents })

    this.client.once('ready', () => {
      console.log('discord client', this.client.options.presence)
      this.emitter.emit('ready')
    })

  }

  login(token) {
    // set the app state to logging in
    return this.client.login(token) != undefined
  }
}

module.exports = { DiscordClient }