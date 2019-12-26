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
      alone: new Avatar(
        gender_value,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ),
      general: new Avatar(
        gender_value,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    }

    this.eye = {
      answer: eye_answer,
      alone: new Avatar(
        gender_value,
        eye_value,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ),
      general: new Avatar(
        gender_value,
        eye_value,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    }

    this.hair = {
      answer: hair_answer,
      alone: new Avatar(
        gender_value,
        undefined,
        hair_value,
        undefined,
        undefined,
        undefined,
        undefined
      ),
      general: new Avatar(
        gender_value,
        eye_value,
        hair_value,
        undefined,
        undefined,
        undefined,
        undefined
      )
    }

    this.mouth = {
      answer: mouth_answer,
      alone: new Avatar(
        gender_value,
        undefined,
        undefined,
        mouth_value,
        undefined,
        undefined,
        undefined
      ),
      general: new Avatar(
        gender_value,
        eye_value,
        hair_value,
        mouth_value,
        undefined,
        undefined,
        undefined
      )
    }

    this.nose = {
      answer: nose_answer,
      alone: new Avatar(
        gender_value,
        undefined,
        undefined,
        undefined,
        nose_value,
        undefined,
        undefined
      ),
      general: new Avatar(
        gender_value,
        eye_value,
        hair_value,
        mouth_value,
        nose_value,
        undefined,
        undefined
      )
    }

    this.hair_tone = {
      answer: hair_tone_answer,
      alone: new Avatar(
        gender_value,
        undefined,
        undefined,
        undefined,
        undefined,
        hair_tone_value,
        undefined
      ),
      general: new Avatar(
        gender_value,
        eye_value,
        hair_value,
        mouth_value,
        nose_value,
        hair_tone_value,
        undefined
      )
    }

    this.pupil_tone = {
      answer: pupil_tone_answer,
      alone: new Avatar(
        gender_value,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        pupil_tone_value
      ),
      general: new Avatar(
        gender_value,
        eye_value,
        hair_value,
        mouth_value,
        nose_value,
        hair_tone_value,
        pupil_tone_value
      )
    }
  }
}

module.exports = History
