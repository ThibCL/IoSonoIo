
CREATE SEQUENCE public.gender_gender_id_seq_6;

CREATE TABLE public.Gender (
                Gender_Id INTEGER NOT NULL DEFAULT nextval('public.gender_gender_id_seq_6'),
                Name VARCHAR NOT NULL,
                CONSTRAINT gender_id PRIMARY KEY (Gender_Id)
);


ALTER SEQUENCE public.gender_gender_id_seq_6 OWNED BY public.Gender.Gender_Id;

CREATE SEQUENCE public.mouth_mouth_id_seq_1;

CREATE TABLE public.Mouth (
                Mouth_Id INTEGER NOT NULL DEFAULT nextval('public.mouth_mouth_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT mouth_id PRIMARY KEY (Mouth_Id)
);


ALTER SEQUENCE public.mouth_mouth_id_seq_1 OWNED BY public.Mouth.Mouth_Id;

CREATE SEQUENCE public.eyes_color_eyes_color_id_seq_1;

CREATE TABLE public.Eyes_Color (
                Eyes_Color_Id INTEGER NOT NULL DEFAULT nextval('public.eyes_color_eyes_color_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT eyes_color_id PRIMARY KEY (Eyes_Color_Id)
);


ALTER SEQUENCE public.eyes_color_eyes_color_id_seq_1 OWNED BY public.Eyes_Color.Eyes_Color_Id;

CREATE SEQUENCE public.nose_nose_id_seq_1;

CREATE TABLE public.Nose (
                Nose_Id INTEGER NOT NULL DEFAULT nextval('public.nose_nose_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT nose_id PRIMARY KEY (Nose_Id)
);


ALTER SEQUENCE public.nose_nose_id_seq_1 OWNED BY public.Nose.Nose_Id;

CREATE SEQUENCE public.eyes_eyes_id_seq_1;

CREATE TABLE public.Eyes (
                Eyes_Id INTEGER NOT NULL DEFAULT nextval('public.eyes_eyes_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT eyes_id PRIMARY KEY (Eyes_Id)
);


ALTER SEQUENCE public.eyes_eyes_id_seq_1 OWNED BY public.Eyes.Eyes_Id;

CREATE SEQUENCE public.hair_hair_id_seq_1;

CREATE TABLE public.Hair (
                Hair_Id INTEGER NOT NULL DEFAULT nextval('public.hair_hair_id_seq_1'),
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                Value INTEGER NOT NULL,
                CONSTRAINT hair_id PRIMARY KEY (Hair_Id)
);


ALTER SEQUENCE public.hair_hair_id_seq_1 OWNED BY public.Hair.Hair_Id;

CREATE SEQUENCE public.game_id_seq;

CREATE TABLE public.Game (
                Id INTEGER NOT NULL DEFAULT nextval('public.game_id_seq'),
                Turn INTEGER NOT NULL,
                CONSTRAINT game_id PRIMARY KEY (Id)
);


ALTER SEQUENCE public.game_id_seq OWNED BY public.Game.Id;

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
                Hair_Id INTEGER,
                Nose_Id INTEGER,
                Eyes_Color_Id INTEGER,
                Eyes_Id INTEGER,
                Mouth_Id INTEGER,
                Gender_Id INTEGER,
                CONSTRAINT avatar_id PRIMARY KEY (Avatar_Id, Id, Player_Id)
);


ALTER SEQUENCE public.avatar_avatar_id_seq OWNED BY public.Avatar.Avatar_Id;

ALTER TABLE public.Avatar ADD CONSTRAINT gender_avatar_fk
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

ALTER TABLE public.Eyes_Color ADD CONSTRAINT gender_eyes_color_fk
FOREIGN KEY (Gender_Id)
REFERENCES public.Gender (Gender_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Eyes ADD CONSTRAINT gender_eyes_fk
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

ALTER TABLE public.Avatar ADD CONSTRAINT mouth_avatar_fk
FOREIGN KEY (Mouth_Id)
REFERENCES public.Mouth (Mouth_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT eyes_color_avatar_fk
FOREIGN KEY (Eyes_Color_Id)
REFERENCES public.Eyes_Color (Eyes_Color_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT nose_avatar_fk
FOREIGN KEY (Nose_Id)
REFERENCES public.Nose (Nose_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT eyes_avatar_fk
FOREIGN KEY (Eyes_Id)
REFERENCES public.Eyes (Eyes_Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.Avatar ADD CONSTRAINT hair_avatar_fk
FOREIGN KEY (Hair_Id)
REFERENCES public.Hair (Hair_Id)
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

ALTER TABLE public.Avatar ADD CONSTRAINT player_avatar_fk
FOREIGN KEY (Player_Id, Id)
REFERENCES public.Player (Player_Id, Id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;