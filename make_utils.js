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
