import server from './src/interfaces/http/server'

server.start()

process.on('SIGINT', () => {
  server.stop()
})
