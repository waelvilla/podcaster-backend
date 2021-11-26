import Sqlite3 from 'sqlite3';

const sqlite3 = Sqlite3.verbose();

export const db = new sqlite3.Database('data.db');
