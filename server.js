require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const {connectDB} = require('./config/db');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET
const app = express();

connectDB();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async ({req}) => {
    const token = await req.headers.authentication || '';
    let user;
    try {
      user = await jwt.verify(token, SECRET);
      console.log(`${user.user} verified`);
    } catch (err) {
      console.error(`JWT verification error: ${err}`);
    }
    return {user, SECRET};
  }
});

server.applyMiddleware({app});

app.use('/images', express.static('images'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
