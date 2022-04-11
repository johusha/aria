// const videoElems = document.getElementsByTagName('video')

// for (var elem of videoElems) {
//   const parent = elem.parent
//   const slider = parent.getElementsByTagName('input')


//   const video = elem
//   slider.addEventListener('something', event => {
//     // set playback speed of the preview
//     const value = event.value

//     video.playbackSpeed = value
//     console.log('something changed to ', value)
//   })
// }

window.addEventListener('load', () => {
  let button = getSequenceButton()
  console.log(button)

  button.addEventListener('click', () => {
    const videos = document.getElementsByTagName('video')

    playVideosInSequence(videos)
  })
})

function getSequenceButton() {
  const button = document.querySelector("#clips-controls > input[type=button]:nth-child(1)")

  return button
}

function playAllVideos() {
  for (var video of document.getElementsByTagName('video')) {
    video.play()
  }
}

function playVideosInSequence(videos) {
  for (var video of videos) {
    video.pause()
    video.currentTime = 0

    video.addEventListener('ended', event => {
      const sibling = event.target.parentElement.nextElementSibling.firstElementChild
      if (sibling == undefined)
        return console.warn('no next clip to play')

      sibling.play()
    })
  }

  videos[0].play()
}