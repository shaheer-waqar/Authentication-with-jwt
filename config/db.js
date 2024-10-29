import mongoose from "mongoose";

const dbConnection = ()=>{

    const uri = process.env.dB_Url;
    mongoose.connect(uri)
   .then(()=> console.log('MongoDB Connected...'))
   .catch(err=> console.error(err));
}

export default dbConnection;