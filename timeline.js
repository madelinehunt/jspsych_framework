//// defining each individual experiment block

// instructions
function intro_and_consent_timeline(){
  var intro_timeline = [];

  var consent_block = copy_default(consent_default);
  consent_block['consent'] = consent_file;

  var intro_instructions = copy_default(instructions_default);
  intro_instructions['pages'] = ['<p>Welcome to the experiment.'];

  intro_timeline.push(consent_block);
  intro_timeline.push(intro_instructions);

  return containerize(intro_timeline);
}

// demographics timeline
function demo_timeline(){
  var demo_timeline = [];

  var demo_instructions = copy_default(instructions_default);
  demo_instructions['pages'] = [
    '<p>Lastly, we would like you to answer a couple of demographic questions.</p>' +
    '<p>Click "next" to proceed.</p>'
  ];
  demo_timeline.push(demo_instructions);

  var demo_trial = copy_default(demographics_default);
  demo_timeline.push(demo_trial);

  var feedback = {
    type: 'survey-text',
    show_clickable_nav: true,
    questions: [
      {prompt: "Do you have any feedback about this study?", rows: 20, columns: 40},
    ],
  };
  demo_timeline.push(feedback);

  return containerize(demo_timeline);
}

// countermeasures timeline (with optional debriefing)
function counter_and_debrief_timeline(){
  var counter_timeline = [];

  var countermeasures = copy_default(countermeasures_default);
  counter_timeline.push(countermeasures);

  //// optional debriefing trial:
  // var debrief = {
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

  return containerize(counter_timeline);
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
