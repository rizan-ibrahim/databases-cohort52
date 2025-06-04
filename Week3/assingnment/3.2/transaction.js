import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "dinner_club",
});

try {
  await connection.beginTransaction();

  const amount = 1000;
  const fromAccount = 1;
  const toAccount = 2;

  await connection.execute(
    `
    update account set balance =balance -? where account_no =?`,
    [amount, fromAccount]
  );
  await connection.execute(
    `
      insert into account_changes (account_no,amount,change_date,remark)
      values (?,?,now(),?)`,
    [fromAccount, -amount, `Transfer to account ${toAccount}`]
  );

  await connection.execute(
    `
      update account set balance = balance + ? where account_no =?`,
    [amount, toAccount]
  );
  await connection.commit();
  console.log("transaction complete");
} catch (err) {
  await connection.rollback();
  console.error("Transaction faild:", err.message);
} finally {
  await connection.end();
}
