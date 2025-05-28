import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "database_assingnment",
});
console.log(" Connected to database: database_assingnment");
//
await connection.execute(`DROP TABLE IF EXISTS author_paper`);
await connection.execute(`DROP TABLE IF EXISTS research_papers`);
await connection.execute(`DROP TABLE IF EXISTS authors`);

await connection.execute(`
   create table authors (
    author_id INT auto_increment primary key,
    author_name varchar(100),
    university varchar(100),
    date_of_birth date,
    h_index INT,
    gender varchar(10),
    mentor INT,
    foreign key (mentor) REFERENCES authors(author_id)
  );
    
  `);

console.log('Table "authors" created with mentor as foreign key');

await connection.execute(`
  create table research_Papers (
    paper_id int auto_increment primary key,
    paper_title varchar (100), 
    conference varchar (100), 
    publish_date date,
    author_id INT,
    foreign key (author_id) references authors(author_id) on delete CASCADE
    );
   
  
  `);

console.log('Table "research_Papers" created');

//
await connection.execute(`
  insert into authors (author_name, university, date_of_birth, h_index, gender)
  values 
    ('rizan', 'hyf', '1998-01-01', 45, 'male'),
    ('gea', 'Stanford', '1975-05-15', 38, 'female'),
    ('araz', 'Oxford', '1992-11-23', 29, 'male');
`);

await connection.end();
