describe('test tickle', () => {

// TODO: write real tests
  it('sets the playback speed to be equivalent to the slider value when changed', () => {

    const sliderControler = getsSliderControllerThingie()
    const slider = getsTheSliderFromTheElement()

    const video = getsTheVideoFromTheElement()

    const event = sliderControler.firesEventThing('changed', { value: '120' })
    const rate = event.value
    video.playbackRate = rate

    expect(video.playbackRate).toEqual(rate)
  })

})