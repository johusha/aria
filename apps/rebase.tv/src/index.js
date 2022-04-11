const videoElems = document.getElementsByTagName('video')

for (var elem of videoElems) {
  const parent = elem.parent
  const slider = parent.getElementsByTagName('input')


  const video = elem
  slider.addEventListener('something', event => {
    // set playback speed of the preview
    const value = event.value

    video.playbackSpeed = value
    console.log('something changed to ', value)
  })
}