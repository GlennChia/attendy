const configurations = {
    'development': {
        'server': `http://localhost:${process.env.PORT_DEV}`,
        'mongoURL': `mongodb://127.0.0.1/${process.env.mongoDatabase}`,
        'port': process.env.PORT_DEV
    },
    'production': {
        'server': `http://localhost:${process.env.PORT_PROD}`,
        'mongoURL': `mongodb://127.0.0.1/${process.env.mongoDatabase}`,
        'port': process.env.PORT_PROD
    },
    'docker': {
        'server':  `http://localhost:${process.env.PORT_DOCKER}`,
        'mongoURL': `mongodb://mongo:27017/${process.env.mongoDatabase}`,
        'port': process.env.PORT_DOCKER
    }
}

module.exports = configurations;