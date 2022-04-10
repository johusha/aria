const md5 = require('md5')

const Daypart = {
  'OVERNIGHT': {start: '200', end: '500'},
  'EARLY_MORNING': {start: '600', end: '1000'},
  'DAYTIME': {start: '1000', end: '1500'},
  'EVENING': {start: '1900', end: '0000'}
}

class RadioShow {
  
}


class Track {
  constructor(src, { type, src }) {
    // track IDs are generated when the show is created
    // and stored in memory to track votes as to be decoupled from the track itself
    // the rating system can be stateless in this way
    // -- just trust me, self; it'll work out

    // Faded Josh: okay I will trust me
    this.id = md5()
    this.metadata = {
      src: src,
      type: type
    }

  }

}



module.exports = { Track }