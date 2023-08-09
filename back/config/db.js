const mongoose = require('mongoose');

const connectToDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO);
        console.log(`connected to DB: ${conn.connection.host}`);
    } catch (error) {
        console.log('Lost connection', error);
        process.exit(1);
    }
}

module.exports = connectToDB;