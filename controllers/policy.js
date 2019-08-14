/**
 * GET /
 * Policy page.
 */
const Policy = require('../models/Policy');
const Lead = require('../models/Lead');


exports.index = (req, res) => {
  var leads;
  Lead.find({}, (err, leadsFinded) => {
    console.log("Leads", leadsFinded)
    leads = leadsFinded
  });
  Policy.find({}, (err, policies) => {
    console.log("Policy", policies)
    res.render('policy/policies', { policies: policies, leads: leads });
  });

};

/**
 * POST /signup
 * Create a new local account.
 */
exports.createPolicy = (req, res, next) => {

  const policy = new Policy({
    policyNumber: req.body.policyNumber,
    attribute: req.body.attribute,
    status: req.body.status,
    clientNumber: req.body.clientNumber,
    agentNumber: req.body.agentNumber,
    created: req.body.created,
    statusUpdateDate: req.body.statusUpdateDate,
    note: req.body.note,
    type: req.body.type,

  });

  Policy.findOne({ policyNumber: req.body.policyNumber }, (err, existingPoicy) => {
    if (err) { return next(err); }
    if (existingPoicy) {
      req.flash('errors', { msg: 'Policy already exists.' });
      return res.redirect('/policy');
    }
    policy.save((err) => {
      if (err) { return next(err); }
      // req.flash('success', { msg: 'Success! New user created with userid '+ req.body.email });
      return res.redirect('/policy');
      // req.logIn(user, (err) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.redirect('/');
      // });
    });
  });
};

/**
* POST /deleteUsers
* Delete Users in user management screen
*/
exports.deletePolicy = (req, res, next) => {
  const inputId = req.body.policyId;
  const idArray = inputId.split(",");
  Policy.remove({ _id: { $in: idArray } }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Policy has been deleted.' });
    res.redirect('/policy');
  });
};

/**
* POST /edit Policy
* Edit Policy in policy management screen
*/
exports.editPolicy = (req, res, next) => {
  // User.findById(req.user.id, (err, user) => {
  Policy.findOne({ _id: req.body.policyId }, (err, policy) => {
    if (err) {
      req.flash('errors', { msg: 'Cannot find policy to edit.' });
      return res.redirect('/policy');
    }
    if (policy) {
      policy.policyNumber = req.body.epolicynumber || '';
      policy.attribute = req.body.attribute || '';
      policy.status = req.body.status || '';
      policy.clientNumber = req.body.eclientnumber || '';
      policy.agentNumber = req.body.eagentnumber || '';
      policy.created = req.body.created || '';
      policy.statusUpdateDate = req.body.estatusupdatedate || '';
      policy.note = req.body.note || '';
      policy.type = req.body.type || '';
      policy.save((err) => {
        if (err) {
          req.flash('errors', { msg: 'Error edit. Please contact adminstrator to check' });
          return res.redirect('/policy');
        }
        req.flash('success', { msg: 'Success! Policy changed successfully' + req.body.epolicynumber});
        return res.redirect('/policy');
      });
    }
  });
};