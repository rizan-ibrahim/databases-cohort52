import mysql from "mysql2";
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});

const setUpQueries = `
DROP DATABASE IF EXISTS meetup;
create database meetup;
use meetup;

/* create invite table */

create table invitee(
invite_no int auto_increment primary key,
invite_name varchar(100),
invite_by varchar(100)
);

/* create room table */

create table room (
room_no int auto_increment primary key,
room_name varchar (100),
floor_no int
);

/* create meeting table */

create table meeting (
meeting_no int auto_increment primary key,
meeting_title varchar(200),
starting_time DATETIME,
ending_time DATETIME,
room_no int, foreign key (room_no) references room (room_no)
);

/* inserting 5 invitees   */

insert into invitee (invite_name,invite_by)
values ('rizan','stas'),('ibrahim','gea'),('araz','ahmed'),('sara','stas'),('jasmin','shero');


/* inserting 5 rooms   */
insert into room (room_name,room_no)
values ('room1',1),('room2',2),('room3',3),('room4',4),('room5',5);


/* inserting meeting   */

insert into meeting (meeting_title,starting_time,ending_time,room_no)
values ('career-session', '2025-05-21 11:00:00', '2025-05-21 13:00:00', 1),
('product', '2025-05-20 11:30:00', '2025-05-20 18:30:00', 2),
('android-workshop', '2025-05-21 15:30:00', '2025-05-21 20:30:00', 3),
('marketing', '2025-05-23 10:30:00', '2025-05-23 14:30:00', 4),
('crypto-event', '2025-05-26 11:00:00', '2025-05-26 15:00:00', 5);

`;
connection.connect((err) => {
  if (err) throw err;
  console.log("connected to mysql");

  connection.query(setUpQueries, (err) => {
    if (err) throw err;
    console.log("databese and tables and data been inserted ");
    connection.end();
  });
});
