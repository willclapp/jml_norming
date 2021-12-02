let timeline = [];

let irb = {
    type: 'html-button-response',
    stimulus: '<div class ="irb"><img src="imgs/SUSig_2color_Stree_Stacked_Left.png" alt="Stanford University Logo" class="logo"><p id="legal"><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p></div>',
    choices: ['Continue']
};

timeline.push(irb);

let general_instructions = {
    type: 'html-keyboard-response',
    stimulus: `<div class="gen_ins"><p>In this experiment, you will hear recordings and will make decisions about them.<br><br>IMPORTANT: Please only accept this task if you are listening through headphones and working in a quiet environment.<br><br>Press the space bar to continue.</p></div>`,
    choices: ['space']
};

timeline.push(general_instructions);


let instructions = {
    type: 'html-keyboard-response',
    stimulus: `<div class="spec_ins"><p>In this experiment, you will hear someone say a list of words. Your job is to try to identify a few characteristics about the speaker based on their voice. Try to listen carefully when you hear them talk. After you hear each list of words you'll answer a few multiple choice questions about the speaker's gender, race, and so on.<br><br>In each trial, you'll hear the speaker say 20 words and then you'll answer 6 questions about them. After you answer the questions, there will be a brief pause and then the next voice will play automatically.<br><br>Please press the space bar to begin.</p></div>`,
    choices: ['space']
};

timeline.push(instructions);


for (i = 0; i < response_objects.length; i++) {
    for (j = 0; j < 24; j++) {
        timeline.push(audio_objects[(i * 24) + j])
    }
    timeline.push(response_objects[i])
}

let social_instructions = {
    type: 'html-keyboard-response',
    stimulus: '<div class="pre-test-container"><p>Great Job! You finished the Experiment.<br><br>To help us interpret our results, it would be helpful to learn a little more about you. Please answer the following questions if you have time. None of the questions are required.</p><br><br>Press the space bar to continue.</div>',
    choices: ['space'],
    post_trial_gap: 250
}

timeline.push(social_instructions)


var survey1 = {
    type: 'survey-html-form',
    preamble: '<p>We would like you to answer answer the following questions.</p>',
    html: '<ol class="input-wrapper">' +
        audio +
        gender +
        age +
        race +
        region +
        ethnicity +
        language +
        '</ol>'
};


var survey2 = {
    type: 'survey-html-form',
    preamble: '<p>We would like you to answer answer the following questions.</p>',
    html: '<ol class="input-wrapper">' +
        assess +
        problems +
        comments +
        '</ol>'
};


timeline.push(survey1)
timeline.push(survey2)



jsPsych.init({
    timeline: timeline,
    show_progress_bar: true,
    // on_finish: function(data) {
    //     proliferate.submit({"trials": data.values()});
    //   }
    on_finish: function () {
        jsPsych.data.displayData('csv');
    }
});