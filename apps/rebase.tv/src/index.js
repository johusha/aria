// Main
const LOOP_SEQUENCE = true

window.addEventListener('load', () => {
  const videos = document.querySelectorAll('video')
  const slider = document.getElementById('playback-speed')
  const sequenceButton = document.querySelector("#clips-controls > input[type=button]:nth-child(1)")

  slider.addEventListener('change', event => {
    const target = event.currentTarget
    const value = target.value

    for (const video of videos) {
      video.playbackRate = value / 100
      console.log({ rate: video.playbackRate })
    }
  })

  for (const video of videos) {
    video.addEventListener('ended', event => {
      const sibling = event.currentTarget.nextElementSibling

      if (sibling == undefined) {
        if (LOOP_SEQUENCE) {
          sequenceButtonHandler()
        }

        return console.warn('reached end of clips')
      } else {
        sibling.play()
      }
    })
  }


  const sequenceButtonHandler = () => {
    const firstVideo = videos[0]

    for (const video of videos) {
      video.pause()
      video.currentTime = 0
      
      video.playbackRate = slider.value / 100
    }

    firstVideo.play()
  }

  sequenceButton.addEventListener('click', sequenceButtonHandler)
})