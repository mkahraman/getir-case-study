const mongoose = require('mongoose');

// Database conntion information

const db = mongoose.connection;

db.on('error', (err) => console.error('DB Connect Error: ', err.message));

db.on('open', () => console.log('DB connected'));

db.on('close', () => console.log('DB disconnect'));

module.exports = {
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        try {
            mongoose.connect(process.env.MONGODB_URI, {
                auto_reconnect: true,
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
        } catch(ex) {
            console.error('DB connect ERR: ', ex.message);
        }
    },
    disconnect: (d) => {
        try {
            mongoose.disconnect(d);
        } catch (ex) {
            console.error('DB disconnect ERR: ', ex.message);
        }
    }
};