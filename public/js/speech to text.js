    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = '';
    let recognition = new window.SpeechRecognition();

    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.lang = "en-us";

    const micBtn = document.querySelector("button");
    const micIcon = micBtn.querySelector("i");

    micBtn.onclick = function() {
      recognition.start();
      console.log("recognition started");
      if (micIcon.classList.contains("fa-microphone-slash")) {
        micIcon.classList.remove("fa-microphone-slash");
        micIcon.classList.add("fa-microphone");
      }
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
          setTimeout(function(){
            console.log("Timeout is working now");
            // 글 내용 초기화, 스크립트 내용도 초기화
            finalTranscript = "";
            // paragraph 들은 다 지운다.
          }, 3000);
          // document.querySelector("#chatbox-container").innerHTML='';

        }
      }
      document.querySelector('#user-chatbox').querySelector('#user').innerHTML = 'user'
      document.querySelector("#answer").innerHTML = '<p id="transcription-container"></p>'
      document.querySelector('#transcription-container').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
      
    }



    