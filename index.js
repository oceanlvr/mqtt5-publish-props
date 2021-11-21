const mqtt = require('mqtt')

const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
  protocolVersion: 5,
  properties: {
    topicAliasMaximum: 10,
    requestResponseInformation: true,
    requestProblemInformation: true,
  }
})

const topic = '/nodejs/mqtt'

client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  // setInterval(() => client.publish(topic, 'nodejs mqtt test', {
  //   qos: 0,
  //   properties: {
  //     topicAlias: 'test',
  //   },
  //   retain: false
  // }, (error) => {
  //   if (error) {
  //     console.error(error)
  //   }
  // }), 1000)
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})