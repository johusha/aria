class RadioShow {
  constructor() {
    this.playlists = []
    this.tracks = []
    this.schedules = []


    this.ratings = {
      liked: {},
      disliked: {}
    }


  }

  start() {
  }

  toggleVote(obj, key, value) {
    let ref = obj[key]

    if (ref == undefined) {
      obj[key] = []
    }

    let index = obj[key].indexOf(value)

    if (index > -1) {
      console.log('existing')
      let arr = obj[key].filter(a => a != value)
      obj[key] = arr
    } else {
      obj[key].push(value)
    }
  }
}

module.exports = RadioShow