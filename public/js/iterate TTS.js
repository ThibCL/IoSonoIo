
var synth = window.speechSynthesis;
var inputTxt = document.querySelector('.question-container');
var voices = [];

var inputAll = document.querySelectorAll('.question-container');
var textStorage = "";
for (i = 0; i<inputAll.length; i++){
    textStorage += inputAll[i].innerHTML + "," ;
    console.log(textStorage);
}

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
    console.log("here?");
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    console.log("speak is start");
    console.log("voices is as follows:" + voices);

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.innerHTML !== '') {
    var utterThis = new SpeechSynthesisUtterance(textStorage);
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
    utterThis.rate = 0.7; // change the rate
    synth.speak(utterThis);
  }
}

document.addEventListener("click", function(){
    speak();
})
setTimeout(function(){
    document.getElementById("hi").click();
}, 100);
