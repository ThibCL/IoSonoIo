var synth = window.speechSynthesis;

var inputTxt = document.querySelector('.question-container');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
  console.log(voices);
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.innerHTML !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.innerHTML);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = "Fiona"; // can change the speaker's voice
    console.log("selectedoption is : " + selectedOption);
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        console.log(utterThis.voice);
        break;
      }
    }
    utterThis.pitch = 1; // change the pitch
    utterThis.rate = 1; // change the rate
    synth.speak(utterThis);
  }
}

// Recent version, if there are not any user activation it does not work
let button = document.querySelector("#slash-mic");
button.onclick = function(event) { // modity the event
  event.preventDefault();

  speak();

  inputTxt.blur();
}

