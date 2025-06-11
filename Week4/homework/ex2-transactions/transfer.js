import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "transactionsDB";

export async function transfer(fromAcc, toAcc, amount, remark) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const accounts = db.collection("accounts");

    // Fetch both accounts
    const sender = await accounts.findOne({ account_number: fromAcc });
    const receiver = await accounts.findOne({ account_number: toAcc });

    if (!sender || !receiver) {
      throw new Error("One or both accounts not found.");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient funds.");
    }

    const nextSenderChange = sender.account_changes.length + 1;
    const nextReceiverChange = receiver.account_changes.length + 1;

    await accounts.updateOne(
      { account_number: fromAcc },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: nextSenderChange,
            amount: -amount,
            changed_date: new Date(),
            remark: `Sent to ${toAcc}: ${remark}`,
          },
        },
      }
    );

    await accounts.updateOne(
      { account_number: toAcc },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: nextReceiverChange,
            amount: amount,
            changed_date: new Date(),
            remark: `Received from ${fromAcc}: ${remark}`,
          },
        },
      }
    );

    console.log(`Transfer of ${amount} from ${fromAcc} to ${toAcc} completed.`);
  } catch (err) {
    console.error("Transfer failed:", err.message);
  } finally {
    await client.close();
  }
}
