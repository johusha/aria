class RadioStation {
  constructor({ player, host, show } = {}) {
    this.player = player ?? new PlayerThing()
    this.host = host ?? new HostThing()
    this.show = show ?? new RadioShow()
    this.tracks = []

    this.online = false
    this.numRetries = 0
  }
}


// TODO: Test and make sure the remove method binding works
class Setlist {
  constructor({tracks}) {
    // setlist needs to be an iteratable array object
    // to avoid bugs
    // TODO: Make setlist iterable (probly with a Set class)
    this.setlist = Array.from(tracks)
    this.playedTracks = []
    this.remove = trackFilteringMethodThing.bind(this, tracks)
  }

  tracks() {
    return this.setlist
  }

  filter(fn) {
    const filtered = this.setlist.filter(fn)
    this.setlist = filtered

    return this
  }

}

function trackFilteringMethodThing(tracklist) {
  return {
    artist: name => this.filter(track => track.user.name != name),
    genre: genre => this.filter(track => track.genre != genre),
    duration: length => this.filter(track => track.duration <= length),
    // existing: () => this.filter(track => this.playedTracks.includes(track.id) == false)
  }
}

module.exports = { RadioStation, Setlist }