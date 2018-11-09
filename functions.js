//// helper functions
function get_randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sum_array(arr){
  return arr.reduce(function(a, b) { return a + b; }, 0);
}

function array_drop_elem(arr, elem){
  ret_array = [];
  arr.forEach(function(e){
    if (e != elem) {
      ret_array.push(e)
    };
  });
  return ret_array;
}

function coin_flip(){
  var rand = Math.random();
  if (rand < 0.5) {
    return 0;
  } else {
    return 1;
  }
}

function killall(){
  jsPsych.endCurrentTimeline();
  jsPsych.finishTrial();
}

function array_mean(xarr){
  // dividing by 0 will return Infinity
  // arr must contain at least 1 element to use reduce
  var arr = []
  xarr.forEach(function(el){ // only considers numbers
    if (typeof(el) == 'number' && el.toString() != 'NaN'){
      arr.push(el);
    } else {
        var n = Number(el);
        if (n.toString() != 'NaN'){
          arr.push(n);
        } else {
          console.log(`Can't cast element "${el}" to Number.`);
        }
      };
  });
  if (arr.length){
      sum = arr.reduce(function(a, b) { return a + b; });
      avg = sum / arr.length;
  } else {
    avg = 0;
  };
  return avg;
}

//// counterbalancing
function local_counterbalancing(conds){
  var randomized_localhost_cond = jsPsych.randomization.sampleWithoutReplacement(conds,1)[0];
  cb_query = {
    arr: conds,
    conds: [randomized_localhost_cond['cond']],
    finishedArr: array_drop_elem(conds, randomized_localhost_cond),
    ids: randomized_localhost_cond['id'],
  };
  return cb_query;
}

//// I/O functions
function save_data_and_debrief(log_to_db) {
  if (log_to_db){
    updateCBDB(study, condition, cb_id); // this function is defined in counterbalance.js
  } else {
    console.log('not logging to DB');
  }
  var data = jsPsych.data.get().readOnly().csv();
  var params = {
    subjid: subjID,
    studyName: study,
    name: "_", // CHANGEME
    toWrite: data,
  }
  $.post("/scripts/latest/save.php", params);

  $('#jspsych-content').append(
    $('<h2>', {
      text: 'Please enter the following code into Mechanical Turk:',
    })
  ).append($('<h1>', {
    text: subjID
  }).css({
    'background-color': 'rgb(255,225,200)'
  }));


  $.get('/scripts/latest/log_turker.php', { // change these properies as needed
    mTurkID: mTurkID,
    subjID: subjID,
    study: study,
    // gender: gend,
    // political_affiliation: poli
  });
}

//// experiment-specific functions
