export default {
  logger: {
    category: 'moniter',
    level: 'DEBUG'
  },
  mongo: {
    moniter: {
      uri: 'mongodb://localhost/moniter',
      sid: 'moniter',
      options: {
        db: {
          native_parser: true
        },
        server: {
          poolSize: 5,
          auto_reconnect: true,
          socketOptions: {
            keepAlive: 1
          }
        },
        user: 'moniter',
        pass: 'moniter'
      },
      dbs: [{
        name: 'moniter',
        default: true
      }]
    }
  }
};
