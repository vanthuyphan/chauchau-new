
const validator = require('validator');
/**
 * GET /
 * Leads page.
 */
const Lead = require('../models/Lead');

exports.index = (req, res) => {
  Lead.find({}, (err, leads) => {
    console.log("Leads", leads)
    res.render('lead/leads', {leads: leads});
  });

};

/**POST create new lead transaction
**/
exports.createLeadTransaction = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/leads');
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  const lead = new Lead({
  	firstName: req.body.firstName,
  	lastName: req.body.lastName,
  	dateOfBirth: req.body.dob,
  	gender: req.body.gender,
  	phoneNumber: req.body.phoneNumber,
  	mailingAddress: req.body.mailingAddress,
  	insuredProperty: req.body.insuredProperty,
  	propertyType: req.body.propertyType,
  	occupancy: req.body.occupancy,
  	loanPurpose: req.body.loanPurpose,
    email: req.body.email,
    agent: req.body.agent,
    loanProcessor: req.body.loanProcessor
  });

  Lead.findOne({ insuredProperty: req.body.insuredProperty }, (err, existingLead) => {
    if (err) { return next(err); }
    if (existingLead) {
      req.flash('errors', { msg: 'The insured property already exists.' });
      return res.redirect('/leads');
    }
    lead.save((err) => {
      if (err) { return next(err); }
      return res.redirect('/leads');
    });
  });
};


/**
 * POST /lead/delete
 * Delete lead transaction
 */
exports.deleteLeadTransaction = (req, res, next) => {
	const inputId = req.body.leadId; 
	const idArray = inputId.split(",");
	Lead.remove({ _id: { $in: idArray } }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Transaction has been deleted.' });
    res.redirect('/leads');
  });
  /*Lead.deleteOne({ _id: req.body.leadId }, (err) => {
    if (err) { return next(err); }
    //req.logout();
    req.flash('info', { msg: 'Transaction has been deleted.' });
    res.redirect('/leads');
  });*/
};

/**
* POST /lead/edit
* Edit one lead transaction
*/
exports.editLeadTransaction = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/leads');
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  Lead.findOne({ _id: req.body.leadId}, (err, existingLead) => {
    if (err) { return next(err); }
    existingLead.firstName = req.body.firstName || '';
    existingLead.lastName = req.body.lastName || '';
    existingLead.dateOfBirth = req.body.dob || '';
    existingLead.email = req.body.email || '';
    existingLead.gender = req.body.gender || '';
    existingLead.agent = req.body.agent || '';
    existingLead.phoneNumber = req.body.phoneNumber || '';
    existingLead.mailingAddress = req.body.mailingAddress || '';
    existingLead.insuredProperty = req.body.insuredProperty || '';
    existingLead.propertyType = req.body.propertyType || '';
    existingLead.loanPurpose = req.body.loanPurpose || '';
    existingLead.loanProcessor = req.body.email || '';
    existingLead.currentPremium = req.body.currentPremium || '';
    existingLead.newPremium = req.body.newPremium || '';
    existingLead.cheaper = req.body.cheaper || '';
    existingLead.occupancy = req.body.occupancy || '';
    existingLead.save((err) => {
      if (err) { 
        req.flash('errors', { msg: 'Error edit. Please contact adminstrator to check' });
        return res.redirect('/users');
      }
      req.flash('success', { msg: 'Success!  Update successfully for account '+ req.body.firstName + ' ' + req.body.lastName });
      return res.redirect('/leads');
    });

  });  

  };