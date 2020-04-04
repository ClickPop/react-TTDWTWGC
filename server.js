require('dotenv').config();
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const {connectDB} = require('./config/db');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const session = require('cookie-session');
const uuid = require('uuid');
const SECRET = process.env.JWT_SECRET
const app = express();
const User = require('./models/User');
const {GraphQLLocalStrategy, buildContext} = require('graphql-passport');
const bcrypt = require('bcrypt');
connectDB();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const user = await (await User.findOne({email})).populate('contributor');
    let error;
    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);
      error = correctPassword ? null : new Error('Invalid credentials');
    } else {
      error = new Error('Invalid credentials'); 
    }
    return done(error, user);
  })
);

app.use(session({
  name: uuid.v4(),
  secret: SECRET,
  maxAge: 6 * 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async ({req, res}) => {
    return buildContext({req, res})
  },
  playground: {
    settings: {
      'editor.theme': 'dark',
      'request.credentials': 'include'
    }
  }
});

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

server.applyMiddleware({app, cors: corsOptions});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
