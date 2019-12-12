class Avatar {
  constructor(gender, eye, hair, mouth, nose, hair_tone, pupil_tone) {
    if (gender == undefined) {
      gender = 1
    }
    if (eye == undefined) {
      eye = -1
    }
    if (hair == undefined) {
      hair = 490
    }
    if (mouth == undefined) {
      mouth = -1
    }
    if (nose == undefined) {
      nose = -1
    }
    if (hair_tone == undefined) {
      hair_tone = -1
    }
    if (pupil_tone == undefined) {
      pupil_tone = -1
    }

    this.url =
      "https://preview.bitmoji.com/avatar-builder-v3/preview/head?scale=1&gender=" +
      gender.toString() +
      "&style=1&rotation=0&beard=-1&brow=-1&cheek_details=-1&ear=-1&earring=-1&eye=" +
      eye.toString() +
      "&eyelash=-1&eye_details=-1&face_lines=-1&glasses=-1&hair=" +
      hair.toString() +
      "&hat=-1&jaw=185&mouth=" +
      mouth.toString() +
      "&nose=" +
      nose.toString() +
      "&pupil=216&beard_tone=-1&blush_tone=-1&brow_tone=-1&eyeshadow_tone=-1&hair_tone=" +
      hair_tone.toString() +
      "&lipstick_tone=-1&pupil_tone=" +
      pupil_tone.toString() +
      "&skin_tone=-1&body=0&face_proportion=0"
  }
}

module.exports = Avatar
