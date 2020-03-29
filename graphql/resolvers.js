require('dotenv').config();
const Activity = require('../models/Activity');
const Contributor = require('../models/Contributor');
const mongoDB = require('mongodb');
const {createWriteStream} = require('fs');
const db = process.env.MONGO_URI;

const resolvers = {
  Query: {
    async activities() {
      const activities = await Activity.find().populate('contributors');
      return activities;
    },
    async activity(parent, args, context, info) {
      let { id, activity_type, audience, pastResults } = args;
      if (id !== undefined) {
        return await Activity.findById(id);
      }
      let query = { approved: true };
      if (pastResults !== undefined) {
        if (pastResults.length === 1) {
          query._id = {$ne: pastResults[0]}
        } else if (pastResults.length > 1) {
          if (pastResults.length >= 3) {
            pastResults = pastResults.slice(pastResults.length - 3);
          }
          query.$and = []
          pastResults.forEach(result => {
            query.$and.push({
              _id: {
                $ne: result
              } 
            });
          });
        }
      }
      if (activity_type !== undefined && activity_type.length > 0) {
        query.activity_type = activity_type;
      }
      if (audience !== undefined && audience.length > 0) {
        query.audience = audience;
      }
      const count = await Activity.find(query)
        .countDocuments()
        .exec();
      let activity = await Activity.findOne(query).skip(Math.floor(Math.random() * count)).populate('contributors');
      return activity;
    },
    async contributors() {
      return await Contributor.find().populate('activities');
    },
    async contributor(parent, args, context, info) {
      return await (await Contributor.findById(args.id)).populate('activities');
    }
  },
  Mutation: {
    async createActivity(parent, { activity }, context, info) {
      const {
        title,
        description,
        url,
        activity_type,
        audience,
        contributors
      } = await activity;
      const newActivity = new Activity({
        title,
        description,
        url,
        activity_type,
        audience,
        contributors,
        approved: false
      });

      return await newActivity.save();
    },
    async createContributor(parent, { contributor }, context, info) {
      const {
        name,
        website,
        twitter,
        other,
        bio,
        headshot,
        email
      } = contributor;

      const newContributor = new Contributor({
        name,
        website,
        twitter,
        other,
        bio,
        headshot,
        email,
        approved: false
      });

      return await newContributor.save();
    }
  }
};

module.exports = resolvers;
