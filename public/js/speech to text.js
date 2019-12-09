    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = '';
    let recognition = new window.SpeechRecognition();

    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.lang = "en-us";

    const micBtn = document.querySelector("button");
    const micIcon = micBtn.querySelector("i");
    recognition.start();
    console.log("recognition started");
    if (micIcon.classList.contains("fa-microphone-slash")) {
      micIcon.classList.remove("fa-microphone-slash");
      micIcon.classList.add("fa-microphone");
    }

    recognition.onresult = (event) => { // run when speech recognition service return result

      // original code
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (event.results[0].isFinal) { // if user stop talking, recognition stopped
        console.log("recognition stopped");
        console.log(finalTranscript);
        recognition.stop();
        if (micIcon.classList.contains("fa-microphone")) {
          micIcon.classList.remove("fa-microphone");
          micIcon.classList.add("fa-microphone-slash");
        }
      }
      document.querySelector('#user-chatbox').querySelector('#user').innerHTML = 'user'
      document.querySelector("#answer").innerHTML = '<p id="transcription-container"></p>'
      document.querySelector('#transcription-container').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
      
      // data for server, HTTP request
      // const data = finalTranscript;
      // const options = {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // };
      // fetch('/', options);
    }



    