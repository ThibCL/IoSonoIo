var Avatar = require("./avatar")

class History {
  constructor(
    gender_answer,
    eye_answer,
    hair_answer,
    mouth_answer,
    nose_answer,
    hair_tone_answer,
    pupil_tone_answer,
    beard_answer,
    brow_answer,
    ear_answer,
    eyelash_answer,
    glasses_answer,
    jaw_answer,
    brow_tone_answer,
    beard_tone_answer,
    eyeshadow_tone_answer,
    lipstick_tone_answer,
    skin_tone_answer,
    gender_value,
    eye_value,
    hair_value,
    mouth_value,
    nose_value,
    hair_tone_value,
    pupil_tone_value,
    beard_value,
    brow_value,
    ear_value,
    eyelash_value,
    glasses_value,
    jaw_value,
    brow_tone_value,
    beard_tone_value,
    eyeshadow_tone_value,
    lipstick_tone_value,
    skin_tone_value
  ) {
    this.gender = {
      answer: gender_answer,
      alone: new Avatar({ gender: gender_value }),
      general: new Avatar({ gender: gender_value })
    }

    this.eye = {
      answer: eye_answer,
      alone: new Avatar({ gender: gender_value, eye: eye_value }),
      general: new Avatar({ gender: gender_value, eye: eye_value })
    }

    this.hair = {
      answer: hair_answer,
      alone: new Avatar({ gender: gender_value, hair: hair_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value
      })
    }

    this.mouth = {
      answer: mouth_answer,
      alone: new Avatar({ gender: gender_value, mouth: mouth_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value
      })
    }

    this.nose = {
      answer: nose_answer,
      alone: new Avatar({ gender: gender_value, nose: nose_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value
      })
    }

    this.hair_tone = {
      answer: hair_tone_answer,
      alone: new Avatar({ gender: gender_value, hair_tone: hair_tone_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value
      })
    }

    this.pupil_tone = {
      answer: pupil_tone_answer,
      alone: new Avatar({ gender: gender_value, pupil_tone: pupil_tone_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value
      })
    }

    this.beard = {
      answer: beard_answer,
      alone: new Avatar({ gender: gender_value, beard: beard_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value
      })
    }

    this.brow = {
      answer: brow_answer,
      alone: new Avatar({ gender: gender_value, brow: brow_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value
      })
    }

    this.ear = {
      answer: ear_answer,
      alone: new Avatar({ gender: gender_value, ear: ear_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value
      })
    }

    this.eyelash = {
      answer: eyelash_answer,
      alone: new Avatar({ gender: gender_value, eyelash: eyelash_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value,
        eyelash: eyelash_value
      })
    }

    this.glasses = {
      answer: glasses_answer,
      alone: new Avatar({ gender: gender_value, glasses: glasses_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value,
        eyelash: eyelash_value,
        glasses: glasses_value
      })
    }

    this.jaw = {
      answer: jaw_answer,
      alone: new Avatar({ gender: gender_value, jaw: jaw_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value,
        eyelash: eyelash_value,
        glasses: glasses_value,
        jaw: jaw_value
      })
    }

    this.brow_tone = {
      answer: brow_tone_answer,
      alone: new Avatar({ gender: gender_value, brow_tone: brow_tone_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value,
        eyelash: eyelash_value,
        glasses: glasses_value,
        jaw: jaw_value,
        brow_tone: brow_tone_value
      })
    }

    this.beard_tone = {
      answer: beard_tone_answer,
      alone: new Avatar({ gender: gender_value, beard_tone: beard_tone_value }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value,
        eyelash: eyelash_value,
        glasses: glasses_value,
        jaw: jaw_value,
        brow_tone: brow_tone_value,
        beard_tone: beard_tone_value
      })
    }

    this.eyeshadow_tone = {
      answer: eyeshadow_tone_answer,
      alone: new Avatar({
        gender: gender_value,
        eyeshadow_tone: eyeshadow_tone_value
      }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value,
        eyelash: eyelash_value,
        glasses: glasses_value,
        jaw: jaw_value,
        brow_tone: brow_tone_value,
        beard_tone: beard_tone_value,
        eyeshadow_tone: eyeshadow_tone_value
      })
    }

    this.lipstick_tone = {
      answer: lipstick_tone_answer,
      alone: new Avatar({
        gender: gender_value,
        lipstick_tone: lipstick_tone_value
      }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value,
        eyelash: eyelash_value,
        glasses: glasses_value,
        jaw: jaw_value,
        brow_tone: brow_tone_value,
        beard_tone: beard_tone_value,
        eyeshadow_tone: eyeshadow_tone_value,
        lipstick_tone: lipstick_tone_value
      })
    }

    this.skin_tone = {
      answer: skin_tone_answer,
      alone: new Avatar({
        gender: gender_value,
        skin_tone: skin_tone_value
      }),
      general: new Avatar({
        gender: gender_value,
        eye: eye_value,
        hair: hair_value,
        mouth: mouth_value,
        nose: nose_value,
        hair_tone: hair_tone_value,
        pupil_tone: pupil_tone_value,
        beard: beard_value,
        brow: brow_value,
        ear: ear_value,
        eyelash: eyelash_value,
        glasses: glasses_value,
        jaw: jaw_value,
        brow_tone: brow_tone_value,
        beard_tone: beard_tone_value,
        eyeshadow_tone: eyeshadow_tone_value,
        lipstick_tone: lipstick_tone_value,
        skin_tone: skin_tone_value
      })
    }
  }
}

module.exports = History
