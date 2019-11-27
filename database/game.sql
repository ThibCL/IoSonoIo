
CREATE TABLE public.Gender (
                Gender_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                CONSTRAINT gender_id PRIMARY KEY (Gender_Id)
);


CREATE TABLE public.Mouth (
                Mouth_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                CONSTRAINT mouth_id PRIMARY KEY (Mouth_Id)
);


CREATE TABLE public.Eyes_Color (
                Eyes_Color_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                CONSTRAINT eyes_color_id PRIMARY KEY (Eyes_Color_Id)
);


CREATE TABLE public.Nose (
                Nose_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                CONSTRAINT nose_id PRIMARY KEY (Nose_Id)
);


CREATE TABLE public.Eyes (
                Eyes_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                CONSTRAINT eyes_id PRIMARY KEY (Eyes_Id)
);


CREATE TABLE public.Hair (
                Hair_Id INTEGER NOT NULL,
                Name VARCHAR NOT NULL,
                CONSTRAINT hair_id PRIMARY KEY (Hair_Id)
);


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
                CONSTRAINT player_name PRIMARY KEY (Id, Player_Id)
);


ALTER SEQUENCE public.player_player_id_seq OWNED BY public.Player.Player_Id;

CREATE SEQUENCE public.avatar_avatar_id_seq;

CREATE TABLE public.Avatar (
                Avatar_Id INTEGER NOT NULL DEFAULT nextval('public.avatar_avatar_id_seq'),
                Id INTEGER NOT NULL,
                Player_Id INTEGER NOT NULL,
                Hair_Id INTEGER NOT NULL,
                Eyes_Id INTEGER NOT NULL,
                Nose_Id INTEGER NOT NULL,
                Mouth_Id INTEGER NOT NULL,
                Eyes_Color_Id INTEGER NOT NULL,
                Gender_Id INTEGER NOT NULL,
                CONSTRAINT avatar_id PRIMARY KEY (Avatar_Id, Id, Player_Id, Hair_Id, Eyes_Id, Nose_Id, Mouth_Id, Eyes_Color_Id, Gender_Id)
);


ALTER SEQUENCE public.avatar_avatar_id_seq OWNED BY public.Avatar.Avatar_Id;

ALTER TABLE public.Avatar ADD CONSTRAINT gender_avatar_fk
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