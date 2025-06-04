import client from "./db.js";

async function main() {
  try {
    await client.connect();
    const db = client.db("databaseWeek3");
    const collection = db.collection("bob_ross_episodes");

    // Fetch all episodes
    const allEpisodes = await collection.find({}).toArray();
    console.log("All episodes:", allEpisodes);

    // Find an episode by title
    const episode = await collection.findOne({ title: "Mountain Retreat" });
    console.log("Single episode:", episode);

    // Insert a new episode
    const newEpisode = {
      title: "Peaceful Sunset",
      season: 99,
      episode: 99,
      painted_elements: ["sunset", "lake", "mountain"],
    };
    await collection.insertOne(newEpisode);
    console.log("New episode inserted");

    // Update an episode
    await collection.updateOne(
      { title: "Peaceful Sunset" },
      { $set: { season: 100 } }
    );
    console.log("Episode updated");

    //  Delete an episode
    await collection.deleteOne({ title: "Peaceful Sunset" });
    console.log("Episode deleted");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.close();
  }
}

main();
