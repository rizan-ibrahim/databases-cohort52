import { setupAccounts } from "./setup.js";
import { transfer } from "./transfer.js";

const run = async () => {
  console.log("🔄 Setting up accounts...");
  await setupAccounts();

  console.log("💸 Transferring 1000 from 101 to 102...");
  await transfer(101, 102, 1000, "Test payment");

  console.log("Done.");
};

run();
