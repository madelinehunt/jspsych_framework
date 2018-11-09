//// defining each individual experiment block

// instructions
function intro_timeline(){
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

// survey at the beginning of the experiment
function survey_timeline(){
  var survey_timeline = []

  var team_likert_labels = [
    'strongly disagree',
    '',
    '',
    '',
    '',
    '',
    'strongly agree'
  ]

  var survey_questions = [
    'I see myself as someone who does a thorough job.',
    'I see myself as someone who tends to be quiet.',
    'I see myself as someone who worries a lot.',
    'I see myself as someone who has a forgiving nature.',
    'I see myself as someone who likes to reflect and play with ideas.',
  ]

  for (var i = 0; i < survey_questions.length; i++) {
    console.log(i);
    var cur_q = {prompt: survey_questions[i], labels: team_likert_labels, required: true};
    console.log(cur_q);
    var post_selection_survey = {
      type: 'survey-likert',
      questions: [cur_q],
      data: {
        'question_text': cur_q['prompt'],
      },
    };
    console.log(post_selection_survey);
    survey_timeline.push(post_selection_survey);
  }

  var survey = {
    type: 'survey-likert',
    timeline: survey_timeline,
  }
  return survey
}

// countermeasures timeline
function counter_and_debrief_timeline(){
  var counter_timeline = []

  var countermeasures = {
    type: "html-counter-response",
    stimulus: '<p>How many <strong>fatal</strong> heart attacks have you had?</p>',
    choices: [0,1,2,3,4,5,6,7,8,9,10],
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

  // defining two different response scales that can be used.
  var page_1_options = ["Male", "Female", "Other", "Prefer not to answer"];
  var page_2_options = ["Jewish", "Native American", "Caucasian American", "African American", "Hispanic American", "Arab", "Indian", "Non-Indian Asian", "African", "Other", "Prefer not to answer"];

  var multi_choice_block = {
    type: 'survey-multi-choice',
    // show_clickable_nav: true,
    questions: [
      {prompt: "Which gender do you most strongly identify with?", options: page_1_options, required:true,},
      {prompt: "Which ethnic group do you most strongly identify with?", options: page_2_options, required: true}
    ],
  };
  demo_timeline.push(multi_choice_block);

  var survey_trial = {
    type: 'survey-text',
    show_clickable_nav: true,
    questions: [
      {prompt: "What is your age?", rows: 1, columns: 20},
    ],
  };
  demo_timeline.push(survey_trial);

  var Feedback = {
    type: 'survey-text',
    show_clickable_nav: true,
    questions: [
      {prompt: "Do you have any feedback about this study?", rows: 20, columns: 40},
    ],
  };
  demo_timeline.push(Feedback);

  var demo_container = {
    type: 'survey-text',
    timeline: demo_timeline,
  };
  return demo_container;
}

//// pulling together all blocks into final main timeline
function define_full_timeline(is_pilot) {
  var timeline = [];
  timeline.push(intro_timeline());
  timeline.push(survey_timeline());
  timeline.push(demo_timeline());
  timeline.push(counter_and_debrief_timeline());
  // CHANGEME
  return timeline;
}

function define_testing_timeline(t_array){
  var timeline = [];
  var timeline_obj = {
    'intro': intro_timeline(),
    'survey': survey_timeline(),
    'counter': counter_and_debrief_timeline(),
    'demo': demo_timeline(),
    'demographic': demo_timeline(),
    'demographics': demo_timeline(),
    // CHANGEME
  };
  t_array.forEach(function(i){timeline.push(timeline_obj[i])});
  return timeline;
}
