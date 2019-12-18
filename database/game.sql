
CREATE SEQUENCE public.question_question_id_seq;

CREATE TABLE public.Question (
                Question_Id INTEGER NOT NULL DEFAULT nextval('public.question_question_id_seq'),
                Context VARCHAR NOT NULL,
                Question VARCHAR NOT NULL,
                CONSTRAINT question_id PRIMARY KEY (Question_Id)
);


ALTER SEQUENCE public.question_question_id_seq OWNED BY public.Question.Question_Id;

CREATE SEQUENCE public.gender_gender_id_seq_6;

CREATE TABLE public.Gender (
                Gender_Id INTEGER NOT NULL DEFAULT nextval('public.gender_gender_id_seq_6'),
                Name VARCHAR NOT NULL,
                CONSTRAINT gender_id PRIMARY KEY (Gender_Id)
);


ALTER SEQUENCE public.gender_gender_id_seq_6 OWNED BY public.Gender.Gender_Id;

CREATE SEQUENCE public.hair_tone_hair_tone_id_seq_1;

CREATE TABLE public.Hair_Tone (
                Hair_Tone_Id VARCHAR NOT NULL DEFAULT nextval('public.hair_tone_hair_tone_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT hair_tone_id PRIMARY KEY (Hair_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.hair_tone_hair_tone_id_seq_1 OWNED BY public.Hair_Tone.Hair_Tone_Id;

CREATE SEQUENCE public.mouth_mouth_id_seq_1;

CREATE TABLE public.Mouth (
                Mouth_Id INTEGER NOT NULL DEFAULT nextval('public.mouth_mouth_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT mouth_id PRIMARY KEY (Mouth_Id, Gender_Id)
);


ALTER SEQUENCE public.mouth_mouth_id_seq_1 OWNED BY public.Mouth.Mouth_Id;

CREATE SEQUENCE public.pupil_tone_pupil_tone_id_seq;

CREATE TABLE public.Pupil_Tone (
                Pupil_Tone_Id INTEGER NOT NULL DEFAULT nextval('public.pupil_tone_pupil_tone_id_seq'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT pupil_tone_id PRIMARY KEY (Pupil_Tone_Id, Gender_Id)
);


ALTER SEQUENCE public.pupil_tone_pupil_tone_id_seq OWNED BY public.Pupil_Tone.Pupil_Tone_Id;

CREATE SEQUENCE public.nose_nose_id_seq_1;

CREATE TABLE public.Nose (
                Nose_Id INTEGER NOT NULL DEFAULT nextval('public.nose_nose_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT nose_id PRIMARY KEY (Nose_Id, Gender_Id)
);


ALTER SEQUENCE public.nose_nose_id_seq_1 OWNED BY public.Nose.Nose_Id;

CREATE SEQUENCE public.eye_eyes_id_seq;

CREATE TABLE public.Eye (
                Eyes_Id INTEGER NOT NULL DEFAULT nextval('public.eye_eyes_id_seq'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT eye_id PRIMARY KEY (Eyes_Id, Gender_Id)
);


ALTER SEQUENCE public.eye_eyes_id_seq OWNED BY public.Eye.Eyes_Id;

CREATE SEQUENCE public.hair_hair_id_seq_1;

CREATE TABLE public.Hair (
                Hair_Id INTEGER NOT NULL DEFAULT nextval('public.hair_hair_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
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
                Waiting BOOLEAN NOT NULL,
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
                Eyes_Id INTEGER,
                Pupil_Tone_Id INTEGER,
                Hair_Tone_Id VARCHAR NOT NULL,
                CONSTRAINT avatar_id PRIMARY KEY (Avatar_Id, Id, Player_Id)
);


ALTER SEQUENCE public.avatar_avatar_id_seq OWNED BY public.Avatar.Avatar_Id;

ALTER TABLE public.Question_Asked ADD CONSTRAINT question_question_asked_fk
FOREIGN KEY (Question_Id)
REFERENCES public.Question (Question_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

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
FOREIGN KEY (Eyes_Id, Gender_Id)
REFERENCES public.Eye (Eyes_Id, Gender_Id)
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