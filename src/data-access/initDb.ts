import Sqlite3 from 'sqlite3';

const sqlite3 = Sqlite3.verbose();

const db = new sqlite3.Database('data.db');

function init() {
    db.serialize(function () {
        db.run("CREATE TABLE users (user_id text PRIMARY KEY NOT NULL, username text, password text, created_at text, last_login text)");

    });

}

export function insert() {
    db.run(`INSERT INTO users(user_id, username) VALUES(?, ?)`, ['1', 'wael'], (err) => {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted`);
    });
}

export function getAllUsers(){
    db.all(`SELECT * FROM users`,(err, rows) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('got rows:', rows);
        
    });
}

db.close();
