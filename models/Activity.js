const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  url: String,
  activity_type: {
    type: [String],
    required: true
  },
  audience: {
    type: [String],
    required: true
  },
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'contributor'
    }
  ],
  approved: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('activity', ActivitySchema);
