import mongoose from "mongoose";

const DatabaseConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("database is connected")
        })
    } catch (error) {
        console.log(error);

    }

}

export default DatabaseConnection;