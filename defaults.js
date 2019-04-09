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
  on_finish: function(){
    // TODO add function to save participant data to subdirectory of "failed_heart_attack_test"
    // will probabaly also have to update save_data_and_show_code() in some way
    console.log('todo!');
  }
};

// debrief trial
var debrief_default = {
  type:'instructions',
  show_clickable_nav: true,
  allow_keys: false,
  pages: function(){
    return [window.get_debrief.responseText];
  },
  on_load: function(){
    $('#jspsych-content div').not('.jspsych-instructions-nav').css('text-align','left');
    $('#jspsych-content div > blockquote').css('margin-left', '8%');
  },
}
