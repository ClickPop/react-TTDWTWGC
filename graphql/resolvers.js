require('dotenv').config();
const Activity = require('../models/Activity');
const Contributor = require('../models/Contributor');
const User = require('../models/User');
const fs = require('fs');
const createWriteStream = fs.createWriteStream;
const path = require('path');
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET = process.env.AWS_BUCKET;
AWS.config = new AWS.Config({
    accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY, region: 'us-east-1'
});
const S3 = new AWS.S3()

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const resolvers = {
  Query: {
    async activities(con) {
      const activities = await Activity.find().populate('contributors');
      return activities;
    },
    async activity(parent, { id, activity_type, audience, pastResults }, context, info) {
      console.log(context);
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
    },
    user(parent, args, context, info) {
      return context.user.user;
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
      let contributorsList = [];
      if (contributors !== null && contributors !== undefined && contributors.length > 0) {
        await asyncForEach(contributors, async contributor => {
          let tmp = await Contributor.findOne({name: contributor});
          contributorsList.push(tmp);
        })
      }

      const newActivity = new Activity({
        title,
        description,
        url,
        activity_type,
        audience,
        contributors: contributorsList,
        approved: false
      });

      return await newActivity.save();
    },
    async createContributor(parent, {contributor}, context, info) {
      const {
        name,
        website,
        twitter,
        other,
        bio,
        headshot,
        email
      } = await contributor;

      const newContributor = new Contributor({
        name,
        website,
        twitter,
        other,
        bio,
        email,
        approved: false
      });

      const {createReadStream, filename, mimetype, encoding} = await headshot;
      const cleanedFilename = filename.toLowerCase().replace(/[^a-z0-9.]/g, '-');
      const readStream = createReadStream();
      const url = await new Promise((resolve, reject) => {     
        let path = `${newContributor.id}/${cleanedFilename}`;
        let params = {
          ACL: 'public-read',
          Body: readStream,
          Bucket: AWS_BUCKET,
          Key: `images/${path}`,
          ContentEncoding: encoding,
          ContentType: mimetype
        };
        S3.upload(params, (err, data) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(data);
            console.log(`URL: ${data.Location}`);
            resolve(data.Location);
          }
        });
        // fs.access(path.join(__dirname, '..', 'images', name, cleanedFilename), error => {
        //   if (error) {
        //     fs.mkdir(path.join(__dirname, '..', 'images', name), {recursive: true}, error => {
        //       if (error) {
        //         console.error(error);
        //         reject();
        //       } else {
        //         dir = path.join(__dirname, '..', 'images', name);
        //         console.log(`Created directiory at ${dir}`);
        //         const writeStream = createWriteStream(`${dir}/${cleanedFilename}`);
        //         readStream
        //         .pipe(writeStream)
        //         .on('error', error => {
        //           console.error(error);
        //           reject();
        //         })
        //         .on('finish', file => {
        //           console.log('file written');
        //           resolve();
        //         });
        //       }
        //     })
        //   } else {
        //     dir = path.join(__dirname, '..', 'images', name);
        //     console.log(`${dir} already exists`);
        //     const writeStream = createWriteStream(`${dir}/${cleanedFilename}`);
        //     readStream
        //       .pipe(writeStream)
        //       .on('error', error => {
        //         console.error(error);
        //         reject();
        //       })
        //       .on('finish', file => {
        //         console.log('file written');
        //         resolve()
        //     })
        //   }
        // });
      });

      // const url = `./images/${newContributor.id}/${cleanedFilename}`
      // const writeStream = createWriteStream(url);
      // readStream.pipe(writeStream);
      newContributor.headshot = url;
      console.log(newContributor);
      return await newContributor.save();
    },
    async register(parent, {email, password}, context, info) {
      let user = new User({
        email,
        password: await bcrypt.hash(password, 10)
      });
      return user.save();
    },
    async login(parent, {email, password}, {SECRET}, info) {
      const user = await User.findOne({email});
      if (!user) {
        throw new Error('Login invalid');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Login invalid');
      }

      const token = await jwt.sign({
        user: {id: user.id, email: user.email}
      }, SECRET, {expiresIn: '1y'});

      return token;
    }
  }
};

module.exports = resolvers;
