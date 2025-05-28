import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "database_assingnment",
});
console.log(" Connected to database: database_assingnment");

const [authorsWithMentors] = await connection.execute(`
  select a.author_name as author,
  m.author_name as mentor
  from authors a left join authors m on a.mentor = m.author_id
  
  `);
console.log("authors and thier mentors");
console.table(authorsWithMentors);

//

const [authorsAndPapers] = await connection.execute(`
  select a.author_name as author,
  rp.paper_title as paper from authors a 
  left join author_paper ap on a.author_id = ap.author_id 
  left join research_papers rp ON ap.paper_id = rp.paper_id

  `);

console.log("Authors and their papers:");
console.table(authorsAndPapers);
//

await connection.end();
