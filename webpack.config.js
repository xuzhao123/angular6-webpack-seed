switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.prod.js')({ evn: 'production' });
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack.dev.js')({ env: 'development' });
}