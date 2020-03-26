require('dotenv').config();
const Activity = require('../models/Activity');
const Contributor = require('../models/Contributor');
const mongoDB = require('mongodb');
const {createWriteStream} = require('fs');
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
      if (activity_type !== undefined && activity_type.length > 0) {
        query.activity_type = activity_type;
      }
      if (audience !== undefined && audience.length > 0) {
        query.audience = audience;
      }
      console.log(query);
      const count = await Activity.find(query)
        .countDocuments()
        .exec();
      return await Activity.findOne(query).skip(Math.floor(Math.random() * count)).populate('contributors');
    },
    async contributors() {
      return await Contributor.find();
    },
    async contributor(parent, args, context, info) {
      return await Contributor.findById(args.id);
    },
    // async uploads() {
    //   return
    // }
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
        // const { stream, filename, mimetype, encoding } = file;

        // var bucket = new mongoDB.GridFSBucket(db);
        // var uploadStream = bucket.openUploadStream(filename);
        // await new Promise((resolve, reject) => {
        //   stream
        //     .pipe(uploadStream)
        //     .on('error', reject)
        //     .on('finish', resolve);
        // });

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
    },
    async uploadFile (parent, { file }, context, info) {
      const { stream, filename, mimetype, encoding } = await file;
      console.log(filename, mimetype, encoding);
      console.log(stream);
      return { filename, mimetype, encoding };
    }
  }
};

module.exports = resolvers;
