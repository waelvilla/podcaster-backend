import { User } from "../../generated/graphql-types";
import { dbUser } from "../types";



export default function makeUser(user: dbUser): User {
    return {
        id: user.user_id,
        username: user.username,
        password: user.password,
        lastLogin: user.last_login,
        createdAt: user.created_at,
    }
}