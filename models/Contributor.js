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
  headshot: String,
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'activity'
    }
  ],
  email: String,
  approved: {
    type: Boolean,
    required: true
  },
  airtable_activities: [String],
  airtable_id: String
});

module.exports = mongoose.model('contributor', ContributorSchema);
