//// misc functions
function get_randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function sum_array(arr){
  return arr.reduce(function(a, b) { return a + b; }, 0);
};

function array_drop_elem(arr, elem){
  ret_array = [];
  arr.forEach(function(e){
    if (e != elem) {
      ret_array.push(e)
    };
  });
  return ret_array;
};

function coin_flip(){
  var rand = Math.random();
  if (rand < 0.5) {
    return 0;
  } else {
    return 1;
  }
};

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
};

function nrange(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

//// jspsych-specific functions
function killall(){
  jsPsych.endCurrentTimeline();
  jsPsych.finishTrial();
};

function data_download(filename='jspsych_data.csv'){
  jsPsych.data.get().readOnly().localSave('CSV',filename)
};

//// functions to help in constructing timeline.js
function copy_default(default_obj){
  // $.extend( true, {}, a ); // another way of cloning an obj
  return Object.assign({},default_obj);
}

function containerize(section){
  if (!$.isArray(section)) {
    var type = section['type'];
    var timeline = [section];
  } else {
    var type = section[0]['type'];
    var timeline = section;
  }
  var container = {
    type: type,
    timeline: timeline,
  };
  return container
}

//// counterbalancing
function local_counterbalancing(conds){
  var randomized_localhost_cond = jsPsych.randomization.sampleWithoutReplacement(conds,1)[0];
  condition_obj = {
    arr: conds,
    conds: [randomized_localhost_cond['cond']],
    finishedArr: array_drop_elem(conds, randomized_localhost_cond),
    ids: 5444,
  };
  return condition_obj;
};

//// I/O functions
function save_data_and_debrief(log_to_db) {
  if (log_to_db){
    console.log(study);
    console.log(condition);
    console.log(cb_id);
    updateCBDB(study, condition, cb_id); // this function is defined in counterbalance.js
  } else {
    console.log('not logging to DB');
  }
  if (response_file_suffix) {
    var r_file_sfix = response_file_suffix;
  } else {
    var r_file_sfix = '_response';
  }

  var data = jsPsych.data.get().readOnly().csv();
  var params = {
    subjid: subjID,
    studyName: study,
    name: r_file_sfix,
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

  var db_obj = {
    mTurkID: mTurkID,
    subjID: subjID,
    study: study,
    // gender: gend,
    // political_affiliation: poli
  };

  if (collect_gender) {
    db_obj['gender'] = gend;
  }

  if (collect_pol) {
    db_obj['political_affiliation'] = poli;
  }

  $.get('/scripts/latest/log_turker.php', db_obj);
};
