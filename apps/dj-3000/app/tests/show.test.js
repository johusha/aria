const { v4: uuidv4 } = require('uuid');
const RadioShow = require('../components/RadioShow')

describe('show tests', () => {

  it('likes a track then unlikes it', () => {
    const trackId = '100'
    const userId = uuidv4()
    const userId2 = uuidv4()

    let radioShow = new RadioShow()

    let ratings = radioShow.ratings
    
    radioShow.toggleVote(ratings.liked, trackId, userId)
    expect(ratings.liked[trackId]).toContain(userId)

    // should remove the vote
    radioShow.toggleVote(ratings.liked, trackId, userId)
    expect(ratings.liked[trackId]).toHaveLength(0)
    
  })
})