import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "populationData";

export async function getPopulationByCountry(countryName) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("population");

  const result = await collection
    .aggregate([
      { $match: { Country: countryName } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } },
        },
      },
      { $sort: { _id: 1 } },
    ])
    .toArray();

  await client.close();
  return result;
}

export async function getAgeDataWithTotal(year, age) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("population");

  const result = await collection
    .aggregate([
      { $match: { Year: year, Age: age } },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] },
        },
      },
    ])
    .toArray();

  await client.close();
  return result;
}
