import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "transactionsDB";

export async function setupAccounts() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const accounts = db.collection("accounts");

    // Delete existing accounts
    await accounts.deleteMany({});

    // Insert sample accounts
    const initialAccounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 5000,
            changed_date: new Date(),
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [
          {
            change_number: 1,
            amount: 3000,
            changed_date: new Date(),
            remark: "Initial deposit",
          },
        ],
      },
    ];

    await accounts.insertMany(initialAccounts);
    console.log("Accounts setup complete.");
  } catch (err) {
    console.error("Error setting up accounts:", err);
  } finally {
    await client.close();
  }
}

setupAccounts();
