const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContributorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  website: String,
  twitter: String,
  other: String,
  bio: String,
  headshot: Object,
  activities: [
    {
      activity: {
        type: Schema.Types.ObjectId,
        ref: 'activity'
      }
    }
  ],
  email: String,
  approved: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('contributor', ContributorSchema);
