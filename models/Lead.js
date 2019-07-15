const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  agent: { type: String, unique: true },
  firstName: { type: String},
  lastName: { type: String},
  middleName: { type: String},
  address: { type: String},
  phoneNumber: { type: String},


}, { timestamps: true });



const lead = mongoose.model('lead', leadSchema);

module.exports = lead;
