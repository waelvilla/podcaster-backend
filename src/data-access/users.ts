import { User } from "../../generated/graphql-types";
import { dbUser } from "../types";
import { db } from "./";
import makeUser from '../orm/user';

const usersDb = Object.freeze({
  findById,
  getAllUsers,
});

export async function findById(id: string): Promise<User>{
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users WHERE user_id=? LIMIT 1`, [id], (err, rows: [dbUser?] ) => {
      if (err) {
        console.log(err.message);
        reject(null);
      } else {
        if (rows?.length) {
          const remodeledUser = makeUser(rows[0])
          resolve(remodeledUser);
        }
        reject('user not found');
        
      }
    });
  });
}
export async function getAllUsers(): Promise<User[] | []> {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, (err, rows: [dbUser?] ) => {
      if (err) {
        console.log(err.message);
        reject([null]);
      } else {
        const remodeledUsers = rows?.map(makeUser)
        resolve(remodeledUsers);
      }
    });
  });
}

export default usersDb;
