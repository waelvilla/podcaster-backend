import { User } from "../../generated/graphql-types";
import { dbUser } from "../types";
import { db } from "./";
import makeUser from "../orm/user";

const usersDb = Object.freeze({
  findById,
  getAllUsers,
  login,
  updateLastLogin,
});

async function findById(id: string): Promise<User> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM users WHERE user_id=? LIMIT 1`,
      [id],
      (err, rows: [dbUser?]) => {
        if (err) {
          console.log(err.message);
          reject(null);
        } else {
          if (rows?.length) {
            const remodeledUser = makeUser(rows[0]);
            resolve(remodeledUser);
          } else {
            reject("user not found");
          }
        }
      }
    );
  });
}

async function login(username: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM users WHERE username=? AND password=? LIMIT 1`,
      [username, password],
      (err, rows: [dbUser?]) => {
        if (err) {
          console.log('err:', err.message);
          reject(null);
        } else {          
          if (rows?.length) {
            const remodeledUser = makeUser(rows[0]);
            resolve(remodeledUser);
          } else {
            reject("user not found");
          }
        }
      }
    );
  });
}

async function updateLastLogin(lastLogin: string, id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.all(
      `UPDATE users SET last_login=? WHERE user_id=?`,
      [lastLogin, id],
      (err, rows: [dbUser?]) => {
        if (err) {
          console.log(err.message);
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function getAllUsers(): Promise<User[] | []> {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, (err, rows: [dbUser?]) => {
      if (err) {
        console.log(err.message);
        reject([null]);
      } else {
        const remodeledUsers = rows?.map(makeUser);
        resolve(remodeledUsers);
      }
    });
  });
}

export default usersDb;
