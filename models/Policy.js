const mongoose = require('mongoose');

const poicySchema = new mongoose.Schema({
    policyNumber: {type: String},
    attribute: {type: String},
    status: {type: String},
    clientNumber: {type: String},
    agentNumber: {type: String},
    created: {type : String},
    statusUpdateDate: {type: Date},
    note : {type: String},
    type: {type: String}

}, { timestamps: true });



const policy = mongoose.model('policy', poicySchema);

module.exports = policy;
