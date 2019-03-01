/// built-in defaults:

// instructions trials
var instructions_default = {
  type:'instructions',
  show_clickable_nav: true,
  allow_keys: false,
};

// demographics trials
var demographics_default = {
  type: 'cikara-demographics',
  // uses built-in paremeters for this plugin
};

// consent trial
var consent_default = {
  type: 'consent',
  data: {'part_of_expt':'consent'},
  on_finish: function() {
    jsPsych.data.addProperties({'SubjID': subjID})
    jsPsych.data.addProperties({'MID': mTurkID})
    jsPsych.data.addProperties({'Condition': condition[0]})
  }
};

// countermeasures trial
var countermeasures_default = {
  type: "html-counter-response",
  stimulus: '<p>How many <strong>fatal</strong> heart attacks have you had?</p>',
  choices: nrange(11,0),
};
