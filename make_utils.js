// shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
} 

// create an array of 0s of the specified length
function createArray(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(0);
    }
    return arr;
}

// Get an array of the ids for the current block
function getIds(word_array, start, stop) {
    let out_arr = [];
    for (let i = start; i < stop; i++) {
        out_arr.push(word_array[i].id);
    }
    return out_arr;
}

function generateWordOrder() {
    word_order = [];
    for (let i = 0; i < word_ids.length; i++) {
        word_order.push(i);
    }
    word_order = shuffle(word_order).slice(0, 24);
    return word_order;
}

function generateBlankTrials(audio_array, audio_template, audio_data_template, response_array, response_template, response_data_template) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 24; j++) {
            let audio_copy = {};
            for (let key in audio_template) {
                audio_copy[key] = audio_template[key];
            }
            let audio_data_copy = {};
            for (let key in audio_data_template) {
                audio_data_copy[key] = audio_data_template[key];
            }
            audio_data_copy.order = j + 1;
            audio_copy.data = audio_data_copy;
            audio_array.push(audio_copy);
        }
        let response_copy = {};
        for (let key in response_template) {
            response_copy[key] = response_template[key];
        }
        let response_data_copy = {};
        for (let key in response_data_template) {
            response_data_copy[key] = response_data_template[key];
        }
        response_data_copy.order = i + 1;
        response_copy.data = response_data_copy;
        response_array.push(response_copy);
    }
}

function generateTrials(audio_array, response_array) {
    for (let i = 0; i < 8; i++) {
        words = generateWordOrder();
        response_array[i].data.talker = talkers[i];
        response_array[i].data.order = i + 1;
        for (let j = 0; j < words.length; j++) {
            let curr = (24 * i) + j;
            audio_array[curr].data.id = words[j] + 1;
            audio_array[curr].data.talker = talkers[i];
            audio_array[curr].data.word = word_ids[words[j]].word;
            let talker_index = header_key.indexOf(talkers[i]);
            for (let k = 0; k < word_ids.length; k++) {
                if (word_ids[k].id == audio_array[curr].data.id) {
                    audio_array[curr].data.recording = word_ids[k].list[talker_index];
                    break;
                }
            }
            audio_array[curr].stimulus = "audio/" + audio_array[curr].data.talker + "/" + audio_array[curr].data.word + "_" + audio_array[curr].data.recording + "_" + audio_array[curr].data.talker + ".wav"
        }
    }
}


// function generateTrials(trial_ord, talker_ord, audio_trials, response_trials, phase) {
//     new_old_prompt = '<div class="big-container"><div class="yes-no"><div class="option-container"><p>NEW</p><p>Press D</p></div><div class="option-container"><p>OLD</p><p>Press K</p></div></div></div>';
//     old_new_prompt = '<div class="big-container"><div class="yes-no"><div class="option-container"><p>OLD</p><p>Press D</p></div><div class="option-container"><p>NEW</p><p>Press K</p></div></div></div>';
//     let voice_pool = generateDifferentTalkers(talker_ids, talker_ord.length);

//     let unique_index = -1;
//     for (let i = 0; i < trial_ord.length; i++) {
//         if (audio_trials[i].data.Phase == 'UNKNOWN') {
//             unique_index += 1;
//             let indices = [i, -1];
//             // identify index of repetition
//             for (let j = i + 1; j < trial_ord.length; j++) {
//                 if (trial_ord[j] == trial_ord[i]) {
//                     indices[1] = j;
//                     break;
//                 }
//             }
//             // add info to new then old trial
//             for (let j = 0; j < indices.length; j++) {
//                 let index = indices[j];
//                 audio_trials[index].data.Phase = phase + "_audio";
//                 response_trials[index].data.Phase = phase;
//                 audio_trials[index].data.ID = trial_ord[index];
//                 response_trials[index].data.ID = trial_ord[index];
//                 audio_trials[index].data.Buttons = button_order;
//                 response_trials[index].data.Buttons = button_order;
//                 audio_trials[index].data.num_voices = talker_ids.length;
//                 response_trials[index].data.num_voices = talker_ids.length;
//                 audio_trials[index].data.token_repeated = identical_tokens;
//                 response_trials[index].data.token_repeated = identical_tokens;

//                 //identify the word
//                 for (let k = 0; k < word_ids.length; k++) {
//                     if (word_ids[k].id == trial_ord[index]) {
//                         audio_trials[index].data.Word = word_ids[k].word;
//                         response_trials[index].data.Word = word_ids[k].word;
//                         break;
//                     }
//                 }
//                 // insert some html
//                 if (button_order == 'NEW_OLD') {
//                     audio_trials[index].prompt = new_old_prompt;
//                     response_trials[index].stimulus = new_old_prompt;
//                 } else {
//                     audio_trials[index].prompt = old_new_prompt;
//                     response_trials[index].stimulus = old_new_prompt;
//                 }
//                 // identify the presentation, talker, and stimulus
//                 let talker_info = talker_ord[unique_index];
//                 if (talker_info.split('_').shift() == 'Same') {
//                     audio_trials[index].data.Same_Talker = true;
//                     response_trials[index].data.Same_Talker = true;
//                 }
//                 let og_talker = talker_info.split('_').pop();
//                 if (j == 0) {
//                     audio_trials[index].data.Presentation = 'NEW';
//                     response_trials[index].data.Presentation = 'NEW';
//                     audio_trials[index].data.Talker = og_talker;
//                     response_trials[index].data.Talker = og_talker;
//                 } else {
//                     audio_trials[index].data.Presentation = 'OLD';
//                     response_trials[index].data.Presentation = 'OLD';
//                     if (audio_trials[index].data.Same_Talker) {
//                         audio_trials[index].data.Talker = og_talker;
//                         response_trials[index].data.Talker = og_talker;
//                     } else {
//                         let diff_talker = '';
//                         for (let k = 0; k < voice_pool.length; k++) {
//                             if (voice_pool[k] != og_talker) {
//                                 diff_talker = voice_pool[k];
//                                 voice_pool.splice(k, 1);
//                                 audio_trials[index].data.Talker = diff_talker;
//                                 response_trials[index].data.Talker = diff_talker;
//                                 break;
//                             }
//                         }
//                     }
//                 }
//                 // stitch together the talker key
//                 let talker_key = audio_trials[index].data.Talker;
//                 if (j == 1 && audio_trials[index].data.token_repeated == false) {
//                     talker_key += "_2";
//                 } else {
//                     talker_key += "_1";
//                 }
//                 // locate correct recording number
//                 let talker_index = header_key.indexOf(talker_key);
//                 for (let k = 0; k < word_ids.length; k++) {
//                     if (word_ids[k].id == audio_trials[index].data.ID) {
//                         audio_trials[index].data.Recording = word_ids[k].list[talker_index];
//                         response_trials[index].data.Recording = word_ids[k].list[talker_index];
//                         break;
//                     }
//                 }
//                 // stitch together audio path
//                 audio_trials[index].stimulus = "../../audio/" + audio_trials[index].data.Talker + "/" + audio_trials[index].data.Word + "_" + audio_trials[index].data.Recording + "_" + audio_trials[index].data.Talker + ".wav";
//             }          
//         }
//     }
// }