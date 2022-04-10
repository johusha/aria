function filterByDuration(track, ms) {
  const duration = track.duration
  return duration && duration <= ms
}

function filterByUserHandle(track, blocklist) {
  const handle = track.user.handle
  return handle && !blocklist.includes(handle)
}
function filterByUserName(track, blocklist) {
  const name = track.user.name
  return name && !blocklist.includes(name)
}

function filterTracksByFn(setlist, filters) {
  let filtered = setlist
  for (let filter of filters) {
    filtered = filtered.filter(filter)
  }
  return filtered
}

const setlist = [
  { user: { handle: 'too_long_song', name: 'kent', duration: 5000 } },
  { user: { handle: 'shit_handle', name: 'stan' }, duration: 300 },
  { user: { handle: 'good_stuff', name: 'brian' }, duration: 230 },
  { user: { handle: 'okay_whatever', name: 'james', duration: 150 } }
]

const bannedHandles = ['shit_handle']
const bannedNamed = ['okay_whatever']

// TODO: make this .then()-able
let filtered = filterTracksByFn(setlist, [filterByDuration], { complicated_args_situation: {names: ['kent', 'stan']}}) //🚽 no