//////// basic variables
var subjID = getSubjID(8);
var study; // = 'mcv/kitchenSink'; CHANGEME
var conds; // example:
          // var conds = [
          //   {"cond": "[\"either\",1,0]" },
          //   {"cond": "[\"either\",1,1]" },
          // ];
          // note: depending on how your conditions are formatted,
          // you may need to modify local_counterbalancing() in functions.js
var consent_file; // = 'INL_behavioral_consent_45min_online.html'; // CHANGEME
////////

//////// other expt options
// optional; if you want to have response file to have a filename suffix
var response_file_suffix; // set to true if you want this option turned on

// optional; if you collect gender and want to write it out to the DB. Variable containing gender should be named "gend".
var collect_gender; // set to true if you want this option turned on

// optional; if you collect political affiliation and want to write it out to the DB. Variable containing political affiliation should be named "poli".
var collect_pol; // set to true if you want this option turned on
////////

//////// URL vars
var urlvars = jsPsych.data.urlVariables();
if (urlvars['MID']) {
  var mTurkID = urlvars['MID'];
} else {
  var mTurkID = 'TESTING_MID'
}
////////

//////// counterbalancing
if (document.location.hostname == 'localhost'){ // allows for localhost testing
  var cb_query = local_counterbalancing(conds);
  var log_to_db = false;
} else {
  var cb_query = getCounterbalanced(study, 1, undefined)
  var log_to_db = true;
};
var cb_id = cb_query.ids[0]
var condition = cb_query.conds
////////

//////// experiment-specific variables

// CHANGEME

////////

//////// launching the experiment with timeline from timeline.js
if (!urlvars.testing) { // defines main (ie non-testing) mode
  var testing = false;
  jsPsych.init({
    timeline: define_full_timeline(),
    on_finish: function(){
      save_data_and_debrief(log_to_db);
    },
  });
} else { // defines testing mode
  var testing = true;

  if (urlvars.timeline) { // helpful if tester types 'timelines' instead of 'timeline'
    urlvars.timelines = urlvars.timeline;
  };

  if (urlvars.timelines) {
    var t_array = urlvars.timelines.split(',')
    jsPsych.init({
      timeline: define_testing_timeline(t_array),
      on_finish: function() {
        jsPsych.data.displayData();
      }
    });
  } else { // if no 'timeline' urlvar in testing mode, do full timeline
    jsPsych.init({
      timeline: define_full_timeline(),
      on_finish: function() {
        jsPsych.data.displayData();
      }
    });
  }
}
////////
