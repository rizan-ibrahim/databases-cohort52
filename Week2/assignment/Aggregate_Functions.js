import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "database_assingnment",
});
console.log(" Connected to database: database_assingnment");

//
const authorMentorRows = await connection.execute(`
  select a.author_name AS author, m.author_name AS mentor
  from authors a
  left join authors m ON a.mentor = m.author_id
`);
console.log("Author and their mentors:");
console.table(authorMentorRows);

//
const [authorPapersRows] = await connection.execute(`
  select a.author_name, r.paper_title
  from authors a
  left join author_paper ap ON a.author_id = ap.author_id
  left join research_papers r ON ap.paper_id = r.paper_id
`);
console.log("Authors and their research papers:");
console.table(authorPapersRows);

//
const [femalePaperCount] = await connection.execute(`
  select count(*) as total_female_papers
  from author_paper ap
  join authors a ON ap.author_id = a.author_id
  where a.gender = 'female'
  `);
console.log("total research papers by femal authors");
console.table(femalePaperCount);

//
const [avgHIndexPerUni] = await connection.execute(`
  select university, avg(h_index) as average_h_index
  from authors
  group by university
`);
console.log("Average h-index per university");
console.table(avgHIndexPerUni);

//
const [totalPapersPerUni] = await connection.execute(`
  select a.university, count(ap.paper_id) as total_papers
  from authors a
  join author_paper ap ON a.author_id = ap.author_id
  group by a.university
`);
console.log("Total research papers per university");
console.table(totalPapersPerUni);

//
const [minMaxHIndex] = await connection.execute(`
  select university, min(h_index) as min_h_index, max(h_index) as max_h_index
  from authors
  group by university
`);
console.log("min and max h-index per university:");
console.table(minMaxHIndex);

//
await connection.end();
