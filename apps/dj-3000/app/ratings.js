// A voting mechanism that determines which songs to play from the playlist (eg. Audius Top 100)

/* Voting */
// The user reacts with a poop emoji
// This initiates a vote to skip the song
// and if the vote fails after however long
// then update the ratings with the votes

// Note: add a secret emoji reaction that just skips the song
// but has a slowmode or smth so it doesn't get abused

/* Discord Reactions */
// The user reacts with a star emoji
// This 'likes' the track for the user
// collect these likes and then update the ratings

// The show takes a ratings object (not an instance but just a bunch of methods; this isnt Java)
// and some kinda controller to pass the ratings to
// return a randomized setlist with play % as a function of votes and likes against the song ratings
// * optionally request rankings and stuff from Audius to just bootstrap their algorithm

