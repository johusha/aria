class Deck {
  constructor() {
    this.setlist = []
    this.trackIndex = 0
  }

  addTrack(track, position) {
    // add track to position
  }

  // removeTrack(track) {
  // }

  // Controller
  nextTrack() {
    console.log('incrementing track index [»]')
    this.setTrackIndex(this.trackIndex++)
  }
  prevTrack() {
    console.log('decrementing track index [«]')
    this.setTrackIndex(this.trackIndex--)
  }
  setTrackIndex(index) {
    this.trackIndex = index
    if (index < 0 || index > this.setlist.length - 1)
      return console.warn('index set out of bounds')
  }
}