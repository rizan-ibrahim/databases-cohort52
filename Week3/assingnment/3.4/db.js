import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URL;
const client = new MongoClient(process.env.MONGO_URL);

export default client;
