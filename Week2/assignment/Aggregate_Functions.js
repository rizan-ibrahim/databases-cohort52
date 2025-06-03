import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "database_assingnment",
});
console.log(" Connected to database: database_assingnment");

const [paperAuthors] = await connection.execute(`
  select 
    rp.paper_id,
    rp.paper_title,
    count(ap.author_id) as number_of_authors
  from research_Papers rp
  join author_paper ap on rp.paper_id = ap.paper_id
  group by rp.paper_id, rp.paper_title
`);
console.log("all research papers and number of authors that wrote them");
console.table(paperAuthors);

//
const [femalePaperCount] = await connection.execute(`
  select count(distinct ap.paper_id) as total_unique_female_papers
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
  select a.university, count(distinct ap.paper_id) as total_unique_papers
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
