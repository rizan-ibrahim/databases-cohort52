import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "dinner_club",
});

await connection.execute(`
  create table if not exists account (
  account_no int auto_increment primary key,
  balance decimal (10,2)
  
  );

  `);

await connection.execute(`
  create table if not exists account_changes (
  change_no int auto_increment primary key,
  account_no int,
  amount decimal (10,2),
  change_date datetime,
  remark varchar (250),
  foreign key (account_no) references account (account_no)
  );

  `);
await connection.end();
