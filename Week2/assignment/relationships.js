import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "database_assingnment",
});
console.log(" Connected to database: database_assingnment");

await connection.execute(`drop table if exists author_paper`);
await connection.execute(`drop table if exists research_papers`);

/// Clean up data and reset auto-increment

await connection.execute(`ALTER TABLE authors AUTO_INCREMENT = 1`);

await connection.execute(`
    create table research_papers(
    paper_id int auto_increment primary key,
    paper_title varchar(100),
    conference varchar(100),
    publish_date date

  )
  `);
console.log("Table 'research_papers' created");

await connection.execute(`
  create table author_paper (
    author_id INT,
    paper_id INT,
    primary key (author_id, paper_id),
    foreign key (author_id) references authors(author_id) on delete CASCADE,
    foreign key (paper_id) references research_papers(paper_id) on delete CASCADE
  );
`);
console.log("Table 'author_paper'junction table created");

await connection.execute(`
  insert into  research_papers (paper_title, conference, publish_date)
  values 
    ('AI in Healthcare', 'NeurIPS', '2022-12-01'),
    ('Quantum Computing Basics', 'QCon', '2023-06-15'),
    ('Climate Change Models', 'UNConf', '2021-09-20');
`);

console.log("Sample research papers inserted");

//
await connection.execute(`
  insert  into author_paper (author_id, paper_id)
  values
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3);
`);
console.log("Sample author-paper relationships inserted");

await connection.end();
