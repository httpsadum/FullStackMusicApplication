const sqlite3 = require("sqlite3").verbose() ;
const fs = require("fs") ;
const path = require("path") ;
const dbPath = path.join(__dirname, "data", "app.db") ;
const sqlPath = path.join(__dirname, "model.sql") ;

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message);
    else console.log("Connected to sqlite database"); 
}) ;

// run
const schema = fs.readFileSync(sqlPath, "utf8") ;
db.exec(schema, (err) => {
    if (err) console.error("Schema error ", err.message) ;
    else console.log("Database done") ;
}) ;

module.exports = db;