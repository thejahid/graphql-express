const express = require("express");
const expressGraphQL = require("express-graphql");

const schema = require("./schema");

const app = express();
const port = 4000;

//graphql route
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Server Running at ${port}`));
