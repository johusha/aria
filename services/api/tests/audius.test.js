const axios = require('axios').default
const fs = require('fs-extra')

describe('audius api', () => {

  it('gets a valid endpoint from the host nodes', async () => {
    const hostsToTestFor = await fs.readJSON('./tests/test-hosts.json')
      .then(hosts => hosts.data)

    const hosts = await getHostsFromEndpoints('https://api.audius.co')
    expect(hostsToTestFor).toContain(hosts)
  })

  it('forces an endpoint to be valid', async () => {
    const endpoint = 'https://discoveryprovider.audius.co'
    const hosts = await getHostsFromEndpoints('https://api.audius.co', { force: true, endpoint })
    expect(hosts).toContain(endpoint)
  })
})

async function getHostsFromEndpoints(endpoints, {force, endpoint} = {} ) {
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const hosts = await axios.get(endpoints)
    .then(res => res.data)
    .then(data => data.data)

  const match = hosts.find(a => a === endpoint)

  return force ? match : rand(hosts)
}