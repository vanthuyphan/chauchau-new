const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  email: String,
  agent: String,
  firstName: String,
  lastName: String,
  middleName: String,
  mailingAddress: String,
  insuredProperty: String,
  phoneNumber: String,
  dateOfBirth: Date,
  gender: String,
  propertyType: String,
  occupancy: String,
  loanPurpose: String,
  loanProcessor: String,
  insuranceClass: String,
  currentPremium: Number,
  newPremium: Number,
  cheaper: String
}, { timestamps: true });



const Lead = mongoose.model('lead', leadSchema);

module.exports = Lead;
