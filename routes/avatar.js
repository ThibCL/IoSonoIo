class Avatar {
  constructor(carac) {
    if (carac.gender == undefined) {
      carac.gender = 1
    }
    if (carac.eye == undefined) {
      if (carac.pupil_tone == undefined) {
        carac.eye = -1
      } else {
        carac.eye = 1619
      }
    }
    if (carac.hair == undefined) {
      if (carac.hair_tone == undefined) {
        carac.hair = 2290
      } else {
        carac.hair = 1670
      }
    }
    if (carac.mouth == undefined) {
      carac.mouth = -1
    }
    if (carac.nose == undefined) {
      carac.nose = -1
    }
    if (carac.hair_tone == undefined) {
      carac.hair_tone = -1
    }
    if (carac.pupil_tone == undefined) {
      carac.pupil_tone = -1
    }

    this.url =
      "https://preview.bitmoji.com/avatar-builder-v3/preview/head?scale=1&gender=" +
      carac.gender.toString() +
      "&style=5&rotation=0&beard=-1&brow=-1&cheek_details=-1&ear=-1&earring=-1&eye=" +
      carac.eye.toString() +
      "&eyelash=-1&eye_details=-1&face_lines=-1&glasses=-1&hair=" +
      carac.hair.toString() +
      "&hat=-1&jaw=1388&mouth=" +
      carac.mouth.toString() +
      "&nose=" +
      carac.nose.toString() +
      "&beard_tone=-1&blush_tone=-1&brow_tone=-1&eyeshadow_tone=-1&hair_tone=" +
      carac.hair_tone.toString() +
      "&lipstick_tone=-1&pupil_tone=" +
      carac.pupil_tone.toString() +
      "&skin_tone=-1&body=0&face_proportion=0"
  }
}

module.exports = Avatar
