import mysql from "mysql2/promise";
const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "dinner_club",
});

await connection.execute(`DELETE FROM account_changes`);
await connection.execute(`DELETE FROM account`);
await connection.execute(`alter table account auto_increment =1`);
await connection.execute(`alter table account_changes auto_increment =1`);

const [resualt1] = await connection.execute(
  `
  
  insert into account (balance) 
  values(?)`,
  [5000.0]
);
const accountId1 = resualt1.insertId;

const [resualt2] = await connection.execute(
  `
  
  insert into account (balance) 
  values (?)`,
  [1000.0]
);
const accountId2 = resualt2.insertId;

await connection.execute(
  `
  
  insert into account_changes (account_no,amount, change_date, remark) 
  values (?,?, NOW(), ?)`,
  [accountId2, 400.0, "Initial deposit"]
);
await connection.end();
