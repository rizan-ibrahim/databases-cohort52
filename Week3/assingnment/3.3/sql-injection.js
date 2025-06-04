function getPopulation(conn, table, name, code, cb) {
  // assuming that connection to the database is established and stored as conn

  const allowedTbles = ["city"];
  if (!allowedTbles.includes(table)) {
    return cb(new Error("invalid table name"));
  }

  const sql = `select Population from ${table} where name =? and CountryCode = ?`;
  conn.query(sql, [name, code], function (err, result) {
    if (err) return cb(err);
    if (result.length === 0) return cb(new Error("Not found"));
    cb(null, result[0].Population);
  });
}
