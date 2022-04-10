const fetch = require('node-fetch')

// connect to audius api
const randy = arr => arr[Math.floor(Math.random() * arr.length)]

async function requestAudiusNodes() {
  const audius = await fetch('https://api.audius.co', {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.text())
    .then(data => JSON.parse(data))

  // select a random node for now
  return randy(audius.data)
}

async function requestTopTracks(endpoint) {
  console.log({endpoint})
  if (typeof endpoint != 'string')
    return console.error(new Error('expected endpoint to be type string'))
  
  const tracks = await fetch(endpoint + '/v1/tracks/trending?time=allTime&app_name=aria-discord-bot')
    .then(response => response.text())
    .then(data => JSON.parse(data))

  return tracks.data
}

async function requestSongData(endpoint, track) {
  console.log({ endpoint })
  if (typeof endpoint != 'string')
    return console.error(new Error('expected endpoint to be type string'))

  const song = await fetch(endpoint + `/v1/tracks/${track.id}/stream?app_name=aria_discord_bot`)
  return song
}

module.exports = { requestAudiusNodes, requestTopTracks, requestSongData }