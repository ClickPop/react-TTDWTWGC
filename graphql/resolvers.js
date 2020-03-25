require('dotenv').config();
const Activity = require('../models/Activity');
const Contributor = require('../models/Contributor');
const mongoDB = require('mongodb');
const db = process.env.MONGO_URI;

const resolvers = {
  Query: {
    async activities() {
      return await Activity.find();
    },
    async activity(parent, args, context, info) {
      const { id, activity_type, audience } = args;
      if (id !== undefined) {
        return await Activity.findById(id);
      }
      const query = { approved: true };
      if (activity_type !== undefined) {
        query.activity_type = activity_type;
      }
      if (audience !== undefined) {
        query.audience = audience;
      }
      const count = await Activity.find(query)
        .countDocuments()
        .exec();
      return Activity.findOne(query).skip(Math.floor(Math.random() * count));
    },
    async contributors() {
      return await Contributor.find();
    },
    async contributor(parent, args, context, info) {
      return await Contributor.findById(args.id);
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
        file,
        email
      } = await contributor;

      if (file !== undefined) {
        const { stream, filename, mimetype, encoding } = file;

        var bucket = new mongoDB.GridFSBucket(db);
        var uploadStream = bucket.openUploadStream(filename);
        await new Promise((resolve, reject) => {
          stream
            .pipe(uploadStream)
            .on('error', reject)
            .on('finish', resolve);
        });
      }

      const headshot = uploadStream !== undefined ? uploadStream.id : undefined;

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
