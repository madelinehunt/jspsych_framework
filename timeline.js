//// defining each individual experiment block

// instructions
function intro_and_consent_timeline(){
  var intro_timeline = []

  var consent_block = {
    type: 'consent',
    consent: consent_file,
    data: {'part_of_expt':'consent'},
    on_finish: function() {
      jsPsych.data.addProperties({'SubjID': subjID})
      jsPsych.data.addProperties({'MID': mTurkID})
      jsPsych.data.addProperties({'Condition': condition[0]})
    }
  }

  var intro_instructions = {
    type: "instructions",
    show_clickable_nav: true,
    pages: ['<p>Welcome to the experiment'], // CHANGEME
  }

  intro_timeline.push(consent_block);
  intro_timeline.push(intro_instructions);

  var intro_flow = {
    type: "instructions",
    timeline: intro_timeline,
    allow_keys: false,
    show_clickable_nav: true,
  }
  return intro_flow;
}

// countermeasures timeline (with optional debriefing)
function counter_and_debrief_timeline(){
  var counter_timeline = []

  var countermeasures = {
    type: "html-counter-response",
    stimulus: '<p>How many <strong>fatal</strong> heart attacks have you had?</p>',
    choices: nrange(11,0),
  };
  counter_timeline.push(countermeasures);

  // var debrief = { // CHANGEME
  //   type: 'external-html',
  //   on_start: function(){
  //     $('#jspsych-content').css({'text-align':'left'});
  //     $('jspsych-btn').css({'text-align':'center'});
  //     },
  //   url: '/scripts/latest/consent/debriefing_mcv_kitchensink.html',
  //   cont_btn: "go_button",
  //   data: {'part_of_expt':'debrief'},
  //   on_finish: function(){
  //     $('#jspsych-content').css({'text-align':'center'});
  //   },
  // };
  // counter_timeline.push(debrief);

  var counter_container = {
    type: 'html-counter-response',
    timeline: counter_timeline,
  }
  return counter_container;
}

// demographics timeline
function demo_timeline(){
  var demo_timeline = []

  var instructions_demo = {
    type: 'instructions',
    show_clickable_nav: true,
    pages: ['<p>Lastly, we would like you to answer a couple of demographic questions.</p>' +
    '<p>Click "next" to proceed.</p>']
  };

  demo_timeline.push(instructions_demo);

  var msurv = {
    type: 'cikara-demographics',
    // uses all defaults for this plugin
  };
  demo_timeline.push(msurv);

  var feedback = {
    type: 'survey-text',
    show_clickable_nav: true,
    questions: [
      {prompt: "Do you have any feedback about this study?", rows: 20, columns: 40},
    ],
  };
  demo_timeline.push(feedback);

  var demo_container = {
    type: 'survey-text',
    timeline: demo_timeline,
  };
  return demo_container;
}

//// pulling together all blocks into final main timeline
function define_full_timeline() {
  var timeline = [];
  timeline.push(intro_and_consent_timeline());
  timeline.push(demo_timeline());
  timeline.push(counter_and_debrief_timeline());
  // CHANGEME
  return timeline;
}

function define_testing_timeline(t_array){
  var timeline = [];
  var timeline_obj = {
    'intro': intro_and_consent_timeline(),
    'counter': counter_and_debrief_timeline(),
    'demo': demo_timeline(),
    'demographic': demo_timeline(),
    'demographics': demo_timeline(),
    // CHANGEME
  };
  t_array.forEach(function(i){timeline.push(timeline_obj[i])});
  return timeline;
}
