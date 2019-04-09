// template version 1.4.2

//////// basic variables
var subjID = getSubjID(8); // defined in funcs.js
var study; // CHANGEME // e.g. 'YourInitials/expt_name'
var conds; // example:
              // var conds = [
              //   {"cond": "[\"either\",0,0]" },
              //   {"cond": "[\"either\",1,1]" },
              //   {"cond": "[\"either\",0,1]" },
              //   {"cond": "[\"either\",1,0]" },
              // ];
          // note: depending on how your conditions are formatted,
          // you may need to modify local_counterbalancing() in functions.js
var consent_file; // CHANGEME // e.g. 'INL_behavioral_consent_15min_online.html';
////////

//////// other expt options
// optional; if you want to have response file to have a filename suffix
var response_file_suffix; // set this to a string for the suffix, if wanted

// optional; if you collect gender and want to write it out to the DB.
// Variable containing gender should be named "gend".
var collect_gender = true; // set to true if you want this option turned on

// optional; if you collect political affiliation and want to write it out to the DB.
// Variable containing political affiliation should be named "poli".
var collect_pol = true; // set to true if you want this option turned on

// if true, this will prevent participants from reloading or closing the page. A confirmation box will appear,
// and while it's onscreen the subject data will be written out to a subdirectory named 'partial_data'.
// The participant will be able to close the confirmation box, and with it the expt window, but we'll have the data.
var capture_partial_data = true;
////////

//////// experiment-specific variables

// CHANGEME

////////

//////// URL vars
var urlvars = jsPsych.data.urlVariables();
if (urlvars.timeline) { // helpful if tester types 'timelines' instead of 'timeline'
  urlvars.timelines = urlvars.timeline;
};

if (urlvars['MID']) {
  var mTurkID = urlvars['MID'];
} else {
  var mTurkID = 'TESTING_MID'
}

if (urlvars['testing'] || urlvars['test']) {
  var testing = true;
} else {
  var testing = false;
}
////////

//////// counterbalancing
if (document.location.hostname == 'localhost'){ // allows for localhost testing
  var cb_query = local_counterbalancing(conds);
  var log_to_db = false;
} else {
  var cb_query = getCounterbalanced(study, 1, undefined); // defined in funcs.js
  var log_to_db = true;
};
var cb_id = cb_query.ids[0];
var condition = cb_query.conds;
////////

//////// launching the experiment with timeline from timeline.js
if (testing && urlvars.timelines) {
  var timeline = define_testing_timeline(urlvars.timelines.split(','));
} else {
  var timeline = define_full_timeline();
}

init_experiment(timeline); // defined in functions.js, though you shouldn't need to mess with it
////////
