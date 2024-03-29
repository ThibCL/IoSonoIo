
CREATE SEQUENCE public.gender_gender_id_seq_6;

CREATE TABLE public.Gender (
                Gender_Id INTEGER NOT NULL DEFAULT nextval('public.gender_gender_id_seq_6'),
                Name VARCHAR NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT gender_id PRIMARY KEY (Gender_Id)
);


ALTER SEQUENCE public.gender_gender_id_seq_6 OWNED BY public.Gender.Gender_Id;

CREATE SEQUENCE public.ear_ear_id_seq_1;

CREATE TABLE public.Ear (
                Ear_Id INTEGER NOT NULL DEFAULT nextval('public.ear_ear_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT ear_id PRIMARY KEY (Ear_Id, Gender_Id)
);


ALTER SEQUENCE public.ear_ear_id_seq_1 OWNED BY public.Ear.Ear_Id;

CREATE SEQUENCE public.beard_tone_beard_tone_id_seq_1;

CREATE TABLE public.Beard_Tone (
                Beard_Tone_Id INTEGER NOT NULL DEFAULT nextval('public.beard_tone_beard_tone_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT beard_tone_id PRIMARY KEY (Beard_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.beard_tone_beard_tone_id_seq_1 OWNED BY public.Beard_Tone.Beard_Tone_Id;

CREATE SEQUENCE public.skin_tone_skin_tone_id_seq_1;

CREATE TABLE public.Skin_Tone (
                Skin_Tone_Id INTEGER NOT NULL DEFAULT nextval('public.skin_tone_skin_tone_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT skin_tone_id PRIMARY KEY (Skin_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.skin_tone_skin_tone_id_seq_1 OWNED BY public.Skin_Tone.Skin_Tone_Id;

CREATE SEQUENCE public.lipstick_tone_lipstick_tone_id_seq;

CREATE TABLE public.Lipstick_Tone (
                Lipstick_Tone_Id INTEGER NOT NULL DEFAULT nextval('public.lipstick_tone_lipstick_tone_id_seq'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT lipstick_tone_id PRIMARY KEY (Lipstick_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.lipstick_tone_lipstick_tone_id_seq OWNED BY public.Lipstick_Tone.Lipstick_Tone_Id;

CREATE SEQUENCE public.glasses_glasses_id_seq_1;

CREATE TABLE public.Glasses (
                Glasses_Id INTEGER NOT NULL DEFAULT nextval('public.glasses_glasses_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT glasses_id PRIMARY KEY (Glasses_Id, Gender_Id)
);


ALTER SEQUENCE public.glasses_glasses_id_seq_1 OWNED BY public.Glasses.Glasses_Id;

CREATE SEQUENCE public.brow_tone_brow_tone_id_seq_1;

CREATE TABLE public.Brow_Tone (
                Brow_Tone_Id INTEGER NOT NULL DEFAULT nextval('public.brow_tone_brow_tone_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT brow_tone_id PRIMARY KEY (Brow_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.brow_tone_brow_tone_id_seq_1 OWNED BY public.Brow_Tone.Brow_Tone_Id;

CREATE SEQUENCE public.eyeshadow_tone_eyeshadow_tone_id_seq_1;

CREATE TABLE public.Eyeshadow_Tone (
                Eyeshadow_Tone_Id INTEGER NOT NULL DEFAULT nextval('public.eyeshadow_tone_eyeshadow_tone_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT eyeshadow_tone_id PRIMARY KEY (Eyeshadow_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.eyeshadow_tone_eyeshadow_tone_id_seq_1 OWNED BY public.Eyeshadow_Tone.Eyeshadow_Tone_Id;

CREATE SEQUENCE public.brow_brow_id_seq_1;

CREATE TABLE public.Brow (
                Brow_Id INTEGER NOT NULL DEFAULT nextval('public.brow_brow_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT brow_id PRIMARY KEY (Brow_Id, Gender_Id)
);


ALTER SEQUENCE public.brow_brow_id_seq_1 OWNED BY public.Brow.Brow_Id;

CREATE SEQUENCE public.jaw_jaw_id_seq_1;

CREATE TABLE public.Jaw (
                Jaw_Id INTEGER NOT NULL DEFAULT nextval('public.jaw_jaw_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT jaw_id PRIMARY KEY (Jaw_Id, Gender_Id)
);


ALTER SEQUENCE public.jaw_jaw_id_seq_1 OWNED BY public.Jaw.Jaw_Id;

CREATE SEQUENCE public.eyelash_eyelash_id_seq_1;

CREATE TABLE public.Eyelash (
                Eyelash_Id INTEGER NOT NULL DEFAULT nextval('public.eyelash_eyelash_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT eyelash_id PRIMARY KEY (Eyelash_Id, Gender_Id)
);


ALTER SEQUENCE public.eyelash_eyelash_id_seq_1 OWNED BY public.Eyelash.Eyelash_Id;

CREATE SEQUENCE public.beard_beard_id_seq_1;

CREATE TABLE public.Beard (
                Beard_Id INTEGER NOT NULL DEFAULT nextval('public.beard_beard_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT beard_id PRIMARY KEY (Beard_Id, Gender_Id)
);


ALTER SEQUENCE public.beard_beard_id_seq_1 OWNED BY public.Beard.Beard_Id;

CREATE SEQUENCE public.question_question_id_seq;

CREATE TABLE public.Question (
                Question_Id INTEGER NOT NULL DEFAULT nextval('public.question_question_id_seq'),
                Context VARCHAR NOT NULL,
                Question VARCHAR NOT NULL,
                Gender_Id INTEGER NOT NULL,
                CONSTRAINT question_id PRIMARY KEY (Question_Id)
);


ALTER SEQUENCE public.question_question_id_seq OWNED BY public.Question.Question_Id;

CREATE SEQUENCE public.hair_tone_hair_tone_id_seq_1;

CREATE TABLE public.Hair_Tone (
                Hair_Tone_Id INTEGER NOT NULL DEFAULT nextval('public.hair_tone_hair_tone_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT hair_tone_id PRIMARY KEY (Hair_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.hair_tone_hair_tone_id_seq_1 OWNED BY public.Hair_Tone.Hair_Tone_Id;

CREATE SEQUENCE public.mouth_mouth_id_seq_1;

CREATE TABLE public.Mouth (
                Mouth_Id INTEGER NOT NULL DEFAULT nextval('public.mouth_mouth_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT mouth_id PRIMARY KEY (Mouth_Id, Gender_Id)
);


ALTER SEQUENCE public.mouth_mouth_id_seq_1 OWNED BY public.Mouth.Mouth_Id;

CREATE SEQUENCE public.pupil_tone_pupil_tone_id_seq;

CREATE TABLE public.Pupil_Tone (
                Pupil_Tone_Id INTEGER NOT NULL DEFAULT nextval('public.pupil_tone_pupil_tone_id_seq'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT pupil_tone_id PRIMARY KEY (Pupil_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.pupil_tone_pupil_tone_id_seq OWNED BY public.Pupil_Tone.Pupil_Tone_Id;

CREATE SEQUENCE public.nose_nose_id_seq_1;

CREATE TABLE public.Nose (
                Nose_Id INTEGER NOT NULL DEFAULT nextval('public.nose_nose_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT nose_id PRIMARY KEY (Nose_Id, Gender_Id)
);


ALTER SEQUENCE public.nose_nose_id_seq_1 OWNED BY public.Nose.Nose_Id;

CREATE SEQUENCE public.eye_eye_id_seq;

CREATE TABLE public.Eye (
                Eye_Id INTEGER NOT NULL DEFAULT nextval('public.eye_eye_id_seq'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT eye_id PRIMARY KEY (Eye_Id, Gender_Id)
);


ALTER SEQUENCE public.eye_eye_id_seq OWNED BY public.Eye.Eye_Id;

CREATE SEQUENCE public.hair_hair_id_seq_1;

CREATE TABLE public.Hair (
                Hair_Id INTEGER NOT NULL DEFAULT nextval('public.hair_hair_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                Idiomatic_Answer VARCHAR NOT NULL,
                CONSTRAINT hair_id PRIMARY KEY (Hair_Id, Gender_Id)
);


ALTER SEQUENCE public.hair_hair_id_seq_1 OWNED BY public.Hair.Hair_Id;

CREATE SEQUENCE public.game_id_seq;

CREATE TABLE public.Game (
                Id INTEGER NOT NULL DEFAULT nextval('public.game_id_seq'),
                Turn INTEGER NOT NULL,
                CONSTRAINT game_id PRIMARY KEY (Id)
);


ALTER SEQUENCE public.game_id_seq OWNED BY public.Game.Id;

CREATE TABLE public.Question_Asked (
                Question_Id INTEGER NOT NULL,
                Id INTEGER NOT NULL,
                Active BOOLEAN NOT NULL,
                Waiting_Confirmation BOOLEAN NOT NULL,
                CONSTRAINT question_asked_id PRIMARY KEY (Question_Id, Id)
);


CREATE SEQUENCE public.player_player_id_seq;

CREATE TABLE public.Player (
                Id INTEGER NOT NULL,
                Player_Id INTEGER NOT NULL DEFAULT nextval('public.player_player_id_seq'),
                Name VARCHAR NOT NULL,
                Turn_Played INTEGER NOT NULL,
                My_Turn BOOLEAN NOT NULL,
                CONSTRAINT player_name PRIMARY KEY (Id, Player_Id)
);


ALTER SEQUENCE public.player_player_id_seq OWNED BY public.Player.Player_Id;

CREATE SEQUENCE public.avatar_avatar_id_seq;

CREATE TABLE public.Avatar (
                Avatar_Id INTEGER NOT NULL DEFAULT nextval('public.avatar_avatar_id_seq'),
                Id INTEGER NOT NULL,
                Player_Id INTEGER NOT NULL,
                Gender_Id INTEGER,
                Hair_Id INTEGER,
                Nose_Id INTEGER,
                Mouth_Id INTEGER,
                Eye_Id INTEGER,
                Pupil_Tone_Id INTEGER,
                Hair_Tone_Id INTEGER,
                Beard_Id INTEGER,
                Eyelash_Id INTEGER,
                Jaw_Id INTEGER,
                Brow_Id INTEGER,
                Eyeshadow_Tone_Id INTEGER,
                Brow_Tone_Id INTEGER,
                Glasses_Id INTEGER,
                Lopstick_Tone_Id INTEGER,
                Skin_Tone_Id INTEGER,
                Beard_Tone_Id INTEGER,
                Ear_Id INTEGER,
                CONSTRAINT avatar_id PRIMARY KEY (Avatar_Id, Id, Player_Id)
);


ALTER SEQUENCE public.avatar_avatar_id_seq OWNED BY public.Avatar.Avatar_Id;

ALTER TABLE public.Pupil_Tone ADD CONSTRAINT gender_eyes_color_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Nose ADD CONSTRAINT gender_nose_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Hair ADD CONSTRAINT gender_hair_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Mouth ADD CONSTRAINT gender_mouth_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT gender_avatar_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Eye ADD CONSTRAINT gender_eyes_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Hair_Tone ADD CONSTRAINT gender_hair_tone_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Question ADD CONSTRAINT gender_question_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Beard ADD CONSTRAINT gender_beard_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Eyelash ADD CONSTRAINT gender_eyelash_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Jaw ADD CONSTRAINT gender_jaw_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Brow ADD CONSTRAINT gender_brow_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Eyeshadow_Tone ADD CONSTRAINT gender_eyeshadow_tone_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Brow_Tone ADD CONSTRAINT gender_brow_tone_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Glasses ADD CONSTRAINT gender_glasses_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Lipstick_Tone ADD CONSTRAINT gender_lipstick_tone_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Skin_Tone ADD CONSTRAINT gender_skin_tone_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Beard_Tone ADD CONSTRAINT gender_beard_tone_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Ear ADD CONSTRAINT gender_ear_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT ear_avatar_fk
FOREIGN KEY (Ear_Id, Gender_Id)
REFERENCES public.Ear (Ear_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT beard_tone_avatar_fk
FOREIGN KEY (Beard_Tone_Id, Gender_Id)
REFERENCES public.Beard_Tone (Beard_Tone_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT skin_tone_avatar_fk
FOREIGN KEY (Skin_Tone_Id, Gender_Id)
REFERENCES public.Skin_Tone (Skin_Tone_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT lipstick_tone_avatar_fk
FOREIGN KEY (Lopstick_Tone_Id, Gender_Id)
REFERENCES public.Lipstick_Tone (Lipstick_Tone_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT glasses_avatar_fk
FOREIGN KEY (Glasses_Id, Gender_Id)
REFERENCES public.Glasses (Glasses_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT brow_tone_avatar_fk
FOREIGN KEY (Brow_Tone_Id, Gender_Id)
REFERENCES public.Brow_Tone (Brow_Tone_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT eyeshadow_tone_avatar_fk
FOREIGN KEY (Eyeshadow_Tone_Id, Gender_Id)
REFERENCES public.Eyeshadow_Tone (Eyeshadow_Tone_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT brow_avatar_fk
FOREIGN KEY (Brow_Id, Gender_Id)
REFERENCES public.Brow (Brow_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT jaw_avatar_fk
FOREIGN KEY (Jaw_Id, Gender_Id)
REFERENCES public.Jaw (Jaw_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT eyelash_avatar_fk
FOREIGN KEY (Eyelash_Id, Gender_Id)
REFERENCES public.Eyelash (Eyelash_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT beard_avatar_fk
FOREIGN KEY (Beard_Id, Gender_Id)
REFERENCES public.Beard (Beard_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Question_Asked ADD CONSTRAINT question_question_asked_fk
FOREIGN KEY (Question_Id)
REFERENCES public.Question (Question_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT hair_tone_avatar_fk
FOREIGN KEY (Hair_Tone_Id, Gender_Id)
REFERENCES public.Hair_Tone (Hair_Tone_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT mouth_avatar_fk
FOREIGN KEY (Mouth_Id, Gender_Id)
REFERENCES public.Mouth (Mouth_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT eyes_color_avatar_fk
FOREIGN KEY (Pupil_Tone_Id, Gender_Id)
REFERENCES public.Pupil_Tone (Pupil_Tone_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT nose_avatar_fk
FOREIGN KEY (Nose_Id, Gender_Id)
REFERENCES public.Nose (Nose_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT eyes_avatar_fk
FOREIGN KEY (Eye_Id, Gender_Id)
REFERENCES public.Eye (Eye_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT hair_avatar_fk
FOREIGN KEY (Hair_Id, Gender_Id)
REFERENCES public.Hair (Hair_Id, Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Player ADD CONSTRAINT game_player_fk
FOREIGN KEY (Id)
REFERENCES public.Game (Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT game_avatar_fk
FOREIGN KEY (Id)
REFERENCES public.Game (Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Question_Asked ADD CONSTRAINT game_question_asked_fk
FOREIGN KEY (Id)
REFERENCES public.Game (Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT player_avatar_fk
FOREIGN KEY (Player_Id, Id)
REFERENCES public.Player (Player_Id, Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;