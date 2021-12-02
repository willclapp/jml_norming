var race_options = ["Black", "White", "Can't Tell"];
var gender_options = ["Female", "Male", "Can't Tell"];
var geography_options = ["West Coast", "South", "Can't Tell"];

let response_temp = {
    type: 'survey-multi-choice',
    post_trial_gap: 1,
    autocomplete: false,
    questions: [{prompt: "Which of these categories more likely describes the race of the speaker?", name: 'race', options: race_options, required:true}, {prompt: "Which of these categories more likely describes the gender of the speaker?", name: 'gender', options: gender_options, required: true}, {prompt: "Where is this speaker more likely from?", name: 'geography', options: geography_options, required: true}],
    data: {}
}

let response_data = {
    talker: 'UNKNOWN',
    order: 0
}

let audio_data = {
    id: 0,
    recording: 0,
    order: 0,
    talker: 'UNKNOWN', 
    word: 'UNKNOWN',
}

let audio_temp = {
    stimulus: 'UNKNOWN', 
    type: 'audio-keyboard-response', 
    // trial_ends_after_audio: true, 
    trial_duration: 1200,
    response_allowed_while_playing: false, 
    choices: [],  
    data: {}
}


audio_objects = [];
response_objects = [];

generateBlankTrials(audio_objects, audio_temp, audio_data, response_objects, response_temp, response_data);

generateTrials(audio_objects, response_objects);

console.log(response_objects);
