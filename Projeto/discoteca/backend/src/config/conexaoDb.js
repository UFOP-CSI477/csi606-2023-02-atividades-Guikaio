import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:yo6Fjxg9Ec2NcaS3@cluster0.sttzsnb.mongodb.net/?retryWrites=true&w=majority');

let db = mongoose.connection;

export default db;
