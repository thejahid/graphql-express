const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require("graphql");
const axios = require("axios");

// //hardcoded data
// const customers = [
//   { id: 1, name: "John Doe", email: "jhon@gmail.com", age: 35 },
//   { id: 2, name: "Mike Posner", email: "mike@gmail.com", age: 40 },
//   { id: 3, name: "Robin Hood", email: "robin@gmail.com", age: 25 },
// ];

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

//root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //all customers
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/customers/")
          .then((res) => res.data);
      },
    },

    //individual customer
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        /*  //for loop find user
        for (let i = 0; i < costomers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }

        //filter find user
        return customers.find((customer) => customer.id === args.id);
        */

        return axios
          .get("http://localhost:3000/customers/" + args.id)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
