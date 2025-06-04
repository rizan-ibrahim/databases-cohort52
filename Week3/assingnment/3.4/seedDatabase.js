import client from "./db.js";
import fs from "fs/promises";

const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));

async function seed() {
  try {
    await client.connect();
    const db = client.db("databaseWeek3");
    const collection = db.collection("bob_ross_episodes");

    // Clean up old data
    await collection.deleteMany();
    await collection.insertMany(data);

    console.log("database seeded successfully");
  } catch (err) {
    console.error("seeding failed", err.message);
  } finally {
    await client.close();
  }
}
seed();
