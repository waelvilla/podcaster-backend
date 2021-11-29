import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { ApolloError } from "apollo-server-errors";
import {  MutationLoginUserArgs, Resolvers } from "../../../generated/graphql-types";
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
  Mutation: {
    loginUser: async (parent, {username, password}: MutationLoginUserArgs, context) => {
      try {
        if (!username?.length || !password?.length) {
          throw new ApolloError('empty username or password');
        }
        const user = await usersDb.login(username, password)
        if (user.id) {
          const newLastLogin = new Date().toISOString()
          await usersDb.updateLastLogin(newLastLogin, user.id )
          return user;
        }
        throw new ApolloError('incorrect username or password');

      } catch (error) {
        console.log('error logging in:', error);
        throw new ApolloError(`cannot login user ${username}`);
      }
    }
  },
};

export default composeResolvers(userResolvers);
