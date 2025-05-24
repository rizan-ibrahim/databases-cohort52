import mysql from "mysql2";
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});
connection.connect((err) => {
  if (err) throw err;
  console.log(" Connected to new_world database");

  const queries = [
    "select name from country where Population > 8000000",
    'select name from country where name like " %land) % "',
    "select name from city where population between 500000 and 1000000",
    "SeLect Name FROM country WHERE Continent = 'Europe'",
    "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC",
    'select name from city where countrycode = "nld" ',
    'select population from city where name = "rotterdam" ',
    "select name, surfacearea from country order by surfacearea desc limit 10",
    "select name, population from city order by population desc limit 10",
    "select sum (population) as wrold_population from country",
  ];

  queries.forEach((query, index) => {
    connection.query(query, (err, results) => {
      if (err) throw err;
      console.log(`${index + 1}:`);
      console.table(results);
    });
  });

  setTimeout(() => {
    connection.end();
    console.log("Done running all queries");
  }, 1500);
});
