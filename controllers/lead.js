/**
 * GET /
 * Leads page.
 */
const Lead = require('../models/Lead');


exports.index = (req, res) => {
  Lead.find({},  'firstName',(err, leads) => {
    console.log("Leads", leads)
    res.render('lead/leads', {leads: leads});
  });

};
