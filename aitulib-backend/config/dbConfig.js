const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URI)
            .then(() =>{
                console.log("Connected to DB");
            })
    } catch (err){
        console.log("MongoDB Error: ", err);
        process.exit(1);
    }
}

module.exports = connectToDB;