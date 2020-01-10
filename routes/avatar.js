class Avatar {
  constructor(carac) {
    if (carac.gender == undefined) {
      carac.gender = 1
    }

    if (carac.beard == undefined) {
      if (carac.beard_tone == undefined) {
        carac.beard = -1
      } else {
        carac.beard = 1642
      }
    }

    if (carac.brow == undefined) {
      if (carac.brow_tone == undefined) {
        carac.brow = -1
      } else {
        if (carac.gender == undefined || carac.gender == 1) {
          carac.brow = 1541
        } else {
          carac.brow = 1577
        }
      }
    }

    if (carac.ear == undefined) {
      carac.ear = -1
    }

    if (carac.glasses == undefined) {
      carac.glasses = -1
    }

    if (carac.jaw == undefined) {
      carac.jaw = 1388
    }

    if (carac.eye == undefined) {
      if (
        carac.pupil_tone == undefined &&
        carac.eyeshadow_tone == undefined &&
        carac.eyelash == undefined
      ) {
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
      if (carac.lipstick_tone == undefined) {
        carac.mouth = -1
      } else {
        if (carac.gender == undefined || carac.gender == 1) {
          carac.mouth = 2337
        } else {
          carac.mouth = 2340
        }
      }
    }

    if (carac.nose == undefined) {
      carac.nose = -1
    }

    if (carac.eyelash == undefined) {
      carac.eyelash = -1
    }

    if (carac.hair_tone == undefined) {
      carac.hair_tone = -1
    }

    if (carac.beard_tone == undefined) {
      carac.beard_tone = -1
    }

    if (carac.brow_tone == undefined) {
      carac.brow_tone = -1
    }

    if (carac.eyeshadow_tone == undefined) {
      carac.eyeshadow_tone = -1
    }

    if (carac.skin_tone == undefined) {
      carac.skin_tone = -1
    }

    if (carac.lipstick_tone == undefined) {
      carac.lipstick_tone = -1
    }

    if (carac.pupil_tone == undefined) {
      carac.pupil_tone = -1
    }

    this.url =
      "https://preview.bitmoji.com/avatar-builder-v3/preview/head?scale=1&gender=" +
      carac.gender.toString() +
      "&style=5&rotation=0&beard=" +
      carac.beard.toString() +
      "&brow=" +
      carac.brow.toString() +
      "&cheek_details=-1&ear=" +
      carac.ear +
      "&earring=-1&eye=" +
      carac.eye.toString() +
      "&eyelash=" +
      carac.eyelash.toString() +
      "&eye_details=-1&face_lines=-1&glasses=" +
      carac.glasses.toString() +
      "&hair=" +
      carac.hair.toString() +
      "&hat=-1&jaw=" +
      carac.jaw.toString() +
      "&mouth=" +
      carac.mouth.toString() +
      "&nose=" +
      carac.nose.toString() +
      "&beard_tone=" +
      carac.beard_tone.toString() +
      "&blush_tone=-1&brow_tone=" +
      carac.brow_tone.toString() +
      "&eyeshadow_tone=" +
      carac.eyeshadow_tone.toString() +
      "&hair_tone=" +
      carac.hair_tone.toString() +
      "&lipstick_tone=" +
      carac.lipstick_tone.toString() +
      "&pupil_tone=" +
      carac.pupil_tone.toString() +
      "&skin_tone=" +
      carac.skin_tone.toString() +
      "&body=0&face_proportion=0"
  }
}

module.exports = Avatar
