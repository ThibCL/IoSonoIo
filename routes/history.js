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
    gender_value,
    eye_value,
    hair_value,
    mouth_value,
    nose_value,
    hair_tone_value,
    pupil_tone_value
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
  }
}

module.exports = History
