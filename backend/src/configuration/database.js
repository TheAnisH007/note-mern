import mongoose from "mongoose";

export default async function Database() {
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log('mongoDB connected')
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}
