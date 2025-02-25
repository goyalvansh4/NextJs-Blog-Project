import mongoose from 'mongoose';

let cached = global.mongooseConn;
if(!cached){
  cached = global.mongooseConn = {conn:null,promise:null}
}

// connect 

async function connectDB (){
  if(cached.conn) return cached.conn;
  if(!cached.promise){
    cached.promise = mongoose.connect(process.env.MONGOURL)
    .then((mongoose)=>mongoose);
  }
  cached.conn = await cached.promise;
  console.log("DB has been connected");
  return cached.conn;
}

export default connectDB;