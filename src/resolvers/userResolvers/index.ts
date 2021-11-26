import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { ApolloError } from "apollo-server-errors";
import { Resolvers } from "../../../generated/graphql-types";
import usersDb from "../../data-access/users";

const userResolvers: Resolvers = {
  Query: {
    getAllUsers: async (parent, args, context) => {
      try {
        const users = await usersDb.getAllUsers();
        return users;
      } catch (err) {
        console.log("error getting all users:", err);
        throw new ApolloError("cannot get users");
      }
    },
    user: async (parent, {id}, context) => {
        try {
            const user = await usersDb.findById(id)
            return user;
        } catch(err) {
            console.log('error finding user:', err);
            throw new ApolloError(`cannot find user with id ${id}`);
        }
    }
  },
  Mutation: {},
};

export default composeResolvers(userResolvers);
